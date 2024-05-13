use std::{
    sync::{Arc, Mutex},
    thread,
    time::Duration,
    sync::mpsc, collections::HashMap,
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
#[derive(PartialEq, Eq,Hash)]
enum AuctionOutcome {
    Winner(usize),
    Loser(usize),
}

fn main() {
    // Numero di partecipanti all'asta
    let participants_number = 40;

    //new instance of HASHMAP
    let mut hashmap: Arc<Mutex<HashMap<usize, i32>>> = Arc::new(Mutex::new(HashMap::new()));

    // Creazione del prodotto all'asta
    let product = Arc::new(Mutex::new(Product {
        name: String::from("Computer"),
        initial_price: 50,
        reserve_price: 50,
    }));

    // Creazione della struttura per memorizzare l'esito dell'asta
    let result = Arc::new(Mutex::new(AuctionResult {
        product_name: product.lock().unwrap().name.clone(),
        winning_price: 0,
        winner: None,
    }));

    // Canale per notificare i partecipanti sul risultato dell'asta
    let (tx, rx) = mpsc::channel::<AuctionOutcome>();

    // Vettore per memorizzare i thread dei partecipanti
    let mut participant_threads = vec![];

    // Variabile condivisa per tenere traccia del partecipante vincente
    let winning_participant: Arc<Mutex<Option<usize>>> = Arc::new(Mutex::new(None));

    // Inizializzazione e avvio dei partecipanti
    for participant_id in 0..participants_number {
        let hashMapClone = Arc::clone(&hashmap);
        let product_clone = Arc::clone(&product);
        let tx_clone = tx.clone();
        let winning_participant_clone = Arc::clone(&winning_participant);

        let thread = thread::spawn(move || {
            let mut rng = rand::thread_rng();
            let mut interested = true;

            while interested {
                // Simulazione dell'offerta del partecipante
                let offer = rng.gen_range(0..=500);
                println!("Participant {} offers: {}", participant_id, offer);

                // Modifica del prezzo del prodotto
                let mut product_guard = product_clone.lock().unwrap();
                if offer >= product_guard.initial_price {
                    product_guard.initial_price = offer + 1;
                    *winning_participant_clone.lock().unwrap() = Some(participant_id);
                    // Notifica agli altri partecipanti del nuovo prezzo
                    println!("Notifying all participants about new price: {}", product_guard.initial_price);

                    hashMapClone.lock().unwrap().insert(participant_id, offer);
                } else {
                    // Il partecipante non è più interessato se l'offerta non supera il prezzo attuale
                    interested = false;
                }

                // Attesa prima di fare una nuova offerta
                thread::sleep(Duration::from_secs(1));
            }
        });

        participant_threads.push(thread);
    }

    // Attesa della conclusione delle offerte da parte dei partecipanti
    for thread in participant_threads {
        thread.join().unwrap();
    }

    // Verifica se il prezzo raggiunto supera il prezzo di riserva
    let winning_price = product.lock().unwrap().initial_price;
    let mut result_guard = result.lock().unwrap();
    if winning_price >= product.lock().unwrap().reserve_price {
        result_guard.winning_price = winning_price;
        let mut max = 0;
        let mut winner_index: usize=usize::MAX;
        for (k,v) in <HashMap<usize, i32> as Clone>::clone(&hashmap.lock().unwrap()).into_iter() {
            if v > max {
                max = v;
                winner_index = k;
            }        
        }

        if(winner_index>=0){
            println!("Auction ended. Product '{}' sold for {} to participant {}",
            result_guard.product_name, result_guard.winning_price-1, winner_index);
        }
    
        for i in 0..participants_number{
            if i != winner_index {
                println!("Partecipant number {} lost the acution.", i);
            }else {
                println!("Partecipant number {} won the acution.", i);
            }
        }
    }else {
        println!("Auction endend. The price dont meet the reserve price");
    }

    

    
}
