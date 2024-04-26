use std::ops::Add;

use RUST05::*;

#[test]
pub fn testCreate() {
    let mut newConto: ContoBancario = ContoBancario::new("Simone".to_string(),100,20,120,10);
    //aggiungo 40 al saldo del conto
    assert_eq!(140,newConto.aggiungiSaldo(40).saldo);
    //prelevo 130 lasciando il conto in rosso
    assert_eq!(10,newConto.preleva(130, 200).saldo);
    //non posso prelevare perciò aggiungo l'interesse
    assert_eq!(40,newConto.preleva(15, 300).saldo);
    
}