use std::ops::Add;

use RUST05::*;

#[test]
pub fn testCreate() {
    let mut newConto: ContoBancario = ContoBancario::new("Simone".to_string(),100,20,120,10);
    assert_eq!("Simone",newConto.cliente);
    assert_eq!(100,newConto.saldo);
    assert_eq!(20,newConto.limite_inf);
    assert_eq!(120,newConto.limite_sup);
    assert_eq!(10,newConto.interesse);
}

#[test]
pub fn testAggiungi() {
    let mut conto: ContoBancario = ContoBancario::new("Simone".to_string(),100,20,120,10);
    //aggiungo 40 al saldo del conto
    assert_eq!(140,conto.aggiungiSaldo(40).saldo);
    //aggiungo 5 al saldo del conto
    assert_eq!(145,conto.aggiungiSaldo(5).saldo);
}

#[test]

pub fn testPreleva() {
    let mut conto: ContoBancario = ContoBancario::new("Simone".to_string(),100,20,120,10);
    //aggiungo 40 al saldo del conto
    assert_eq!(140,conto.aggiungiSaldo(40).saldo);
    //prelevo 130 lasciando il conto in rosso
    assert_eq!(10,conto.preleva(130).saldo);
    //non posso prelevare perciò aggiungo l'interesse
    assert_eq!(11,conto.preleva(15).saldo);
}
    
    