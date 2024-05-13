use std::{
    sync::{Arc, Mutex},
    thread,
    time::Duration,
    sync::mpsc,
    collections::HashMap,
};

use rand::Rng;

// Struttura per rappresentare il prodotto all'asta
#[derive(Clone)]
struct Product {
    name: String,
    initial_price: i32,
    reserve_price: i32,
}

// Struttura per memorizzare l'esito dell'asta
struct AuctionResult {
    product_name: String,
    winning_price: i32,
    winner: Option<usize>,
}

// Messaggio per notificare i partecipanti sul risultato dell'asta
#[derive(PartialEq, Eq, Hash)]
enum AuctionOutcome {
    Winner(usize),
    Loser(usize),
}

fn main() {
    let participants_number = 10;

    let hashmap: Arc<Mutex<HashMap<usize, i32>>> = Arc::new(Mutex::new(HashMap::new()));
    let product = Arc::new(Mutex::new(Product {
        name: String::from("Computer"),
        initial_price: 50,
        reserve_price: 50,
    }));
    let result = Arc::new(Mutex::new(AuctionResult {
        product_name: product.lock().unwrap().name.clone(),
        winning_price: 0,
        winner: None,
    }));
    let (tx, rx) = mpsc::channel::<AuctionOutcome>();
    let mut participant_threads = vec![];
    let winning_participant: Arc<Mutex<Option<usize>>> = Arc::new(Mutex::new(None));

    initialize_participants(
        &hashmap,
        &product,
        &tx,
        &winning_participant,
        participants_number,
        &mut participant_threads,
    );

    wait_for_threads_completion(participant_threads);

    let winning_price = product.lock().unwrap().initial_price;
    let mut result_guard = result.lock().unwrap();
    if winning_price >= product.lock().unwrap().reserve_price {
        result_guard.winning_price = winning_price;
        let winning_option = determine_winner(&hashmap);
        if let Some((winner_index, _)) = winning_option {
            println!(
                "Auction ended. Product '{}' sold for {} to participant {}",
                result_guard.product_name,
                result_guard.winning_price - 1,
                winner_index
            );

            print_auction_results(winner_index, participants_number);
        } else {
            println!("Auction ended. The price didn't meet the reserve price");
        }
    } else {
        println!("Auction ended. The price didn't meet the reserve price");
    }
}

fn initialize_participants(
    hashmap: &Arc<Mutex<HashMap<usize, i32>>>,
    product: &Arc<Mutex<Product>>,
    tx: &mpsc::Sender<AuctionOutcome>,
    winning_participant: &Arc<Mutex<Option<usize>>>,
    participants_number: usize,
    participant_threads: &mut Vec<thread::JoinHandle<()>>,
) {
    for participant_id in 0..participants_number {
        let hashMapClone = Arc::clone(hashmap);
        let product_clone = Arc::clone(product);
        let tx_clone = tx.clone();
        let winning_participant_clone = Arc::clone(winning_participant);

        let thread = thread::spawn(move || {
            let mut rng = rand::thread_rng();
            let mut interested = true;

            while interested {
                let offer = rng.gen_range(0..=500);
                println!("Participant {} offers: {}", participant_id, offer);

                let mut product_guard = product_clone.lock().unwrap();
                if offer >= product_guard.initial_price {
                    product_guard.initial_price = offer + 1;
                    *winning_participant_clone.lock().unwrap() = Some(participant_id);
                    println!(
                        "Notifying all participants about new price: {}",
                        product_guard.initial_price
                    );

                    hashMapClone.lock().unwrap().insert(participant_id, offer);
                } else {
                    interested = false;
                }

                thread::sleep(Duration::from_secs(1));
            }
        });

        participant_threads.push(thread);
    }
}

fn wait_for_threads_completion(participant_threads: Vec<thread::JoinHandle<()>>) {
    for thread in participant_threads {
        thread.join().unwrap();
    }
}

fn determine_winner(hashmap: &Arc<Mutex<HashMap<usize, i32>>>) -> Option<(usize, i32)> {
    let hashMapClone = hashmap.clone();
    let mut max = 0;
    let mut winner_index: usize = usize::MAX;

    for (k, v) in hashMapClone.try_lock().unwrap().iter() {
        if *v > max {
            max = *v;
            winner_index = *k;
        }
    }

    if winner_index != usize::MAX {
        Some((winner_index, max))
    } else {
        None
    }
}

fn print_auction_results(winner_index: usize, participants_number: usize) {
    for i in 0..participants_number {
        if i != winner_index {
            println!("Partecipant number {} lost the auction.", i);
        } else {
            println!("Partecipant number {} won the auction.", i);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_determine_winner_single_winner() {
        // Creiamo un Mutex con un HashMap contenente un solo partecipante
        let hashmap = Arc::new(Mutex::new(HashMap::new()));
        {
            let mut map = hashmap.lock().unwrap();
            map.insert(1, 60);
        }
        // Cloniamo il Mutex
        let map_clone = Arc::clone(&hashmap);

        // Chiamiamo determine_winner utilizzando il riferimento al Mutex clonato
        let winner_option = determine_winner(&map_clone);

        // Verifichiamo il risultato
        assert_eq!(winner_option, Some((1, 60)));
    }


    #[test]
    fn test_determine_winner_no_winner() {
        // Creiamo un Mutex con un HashMap contenente più partecipanti senza un vincitore
        let hashmap = Arc::new(Mutex::new(HashMap::new()));
        {
            let mut map = hashmap.lock().unwrap();
            map.insert(1, 40);
            map.insert(2, 30);
            map.insert(3, 20);
        }
        let map_clone = Arc::clone(&hashmap);

        // Chiamiamo determine_winner utilizzando il HashMap
        let winner_option = determine_winner(&map_clone);

        // Verifichiamo il risultato
        assert_eq!(winner_option, None);
    }
}

