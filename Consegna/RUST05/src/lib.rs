pub struct ContoBancario {
    pub cliente : String,
    pub saldo : i32,
    pub limite_inf : i32,
    pub limite_sup : i32,
    pub interesse : i32,
    pub statoSaldo : Box<dyn StatoSaldo>
}

pub trait StatoSaldo {
    fn deposita (&mut self,conto: i32, value:i32) -> i32;
    fn preleva (&mut self, conto: i32,value:i32) -> i32;
    fn pagaInteressi (&mut self, conto: i32,interesse: i32) -> i32;
    fn showStatoSaldo(&self) -> ();
    fn is_type(&self) -> TipoSaldo;
}


struct Rosso;
struct Argento;
struct Oro;

#[derive(Debug,PartialEq)]

enum TipoSaldo {
    Rosso,
    Argento,
    Oro
}

impl StatoSaldo for Rosso {
    fn deposita (&mut self,mut conto: i32, value:i32) -> i32 {
        conto+=value;
        conto
    }

    fn preleva (&mut self,mut conto: i32,value:i32) -> i32 {
        println!("Non puoi prelevare perchè lo stato del saldo è rosso");
        conto
    }

    fn pagaInteressi (&mut self,mut conto: i32, interesse : i32) -> i32 {
        conto = (conto*interesse)/100;
        conto
    }

    fn showStatoSaldo(&self) -> () {
        println!("Stato saldo: Rosso");
    }

    fn is_type(&self) -> TipoSaldo {
        TipoSaldo::Rosso
    }
}

impl StatoSaldo for Argento {
    fn deposita (&mut self,mut conto: i32, value:i32) -> i32 {
        conto+=value;
        conto
    }

    fn preleva (&mut self,mut conto: i32,value:i32) -> i32 {
        if conto > value {
            conto-=value;
        }

        conto
    }

    fn pagaInteressi (&mut self, mut conto: i32,interesse : i32) -> i32 {
        println!("Non paghi interessi poichè lo stato del saldo è Argento");
        conto
    }

    fn showStatoSaldo(&self) -> () {
        println!("Stato saldo: Argento");
    }

    fn is_type(&self) -> TipoSaldo {
        TipoSaldo::Argento
    }
}

impl StatoSaldo for Oro {
    fn deposita (&mut self,mut conto: i32, value:i32) -> i32 {
        conto+=value;
        conto
    }

    fn preleva (&mut self,mut conto: i32,value:i32) -> i32 {
        if conto > value {
            conto-=value;
        }
        
        conto
    }

    fn pagaInteressi (&mut self,mut conto: i32,interesse: i32) -> i32 {
        conto = (conto*interesse)/100;
        conto
    }

    fn showStatoSaldo(&self) -> () {
        println!("Stato saldo: Oro");
    }

    fn is_type(&self) -> TipoSaldo {
        TipoSaldo::Oro
    }
}

impl ContoBancario {

    pub fn new(clientName : String, saldo : i32, min : i32, max : i32, interesse : i32) -> Self {
        let stateBox: Box<dyn StatoSaldo> = match saldo<min {
            true => Box::new(Rosso),
            false => match saldo<max {
                true => Box::new(Argento),
                false => Box::new(Oro)
            }
        };

        ContoBancario {
            cliente : String::from(clientName),
            saldo : saldo,
            limite_inf : min,
            limite_sup : max,
            interesse : interesse,
            statoSaldo : stateBox
        }
    }

    pub fn aggiungiSaldo(&mut self,value : i32) -> &mut Self{
        //aggiungo il saldo
        self.saldo = self.statoSaldo.deposita(self.saldo, value);

        //cambio lo stato
        self.changeState();

        //mostro lo stato
        self.statoSaldo.showStatoSaldo();

        self
    }

    pub fn preleva(&mut self, value : i32,interesse : i32) -> &mut Self{
        //aggiungo il saldo
        self.saldo = self.statoSaldo.preleva(self.saldo, value);

        //se lo stato è rosso/oro pago interessi
        if self.statoSaldo.is_type() == TipoSaldo::Rosso {
            self.saldo += self.statoSaldo.pagaInteressi(self.saldo, interesse);

            //cambio lo stato
            self.changeState();
        }else {
            //cambio lo stato
            self.changeState();
        }

        //mostro lo stato
        self.statoSaldo.showStatoSaldo();

        self
    }

    pub fn changeState(&mut self) -> &mut ContoBancario {
        //se lo stato del saldo è inferiore al limite, lo stato del saldo diventa rosso
        match self.saldo<self.limite_inf {
            true => self.statoSaldo = Box::new(Rosso),
            false => match self.saldo<self.limite_sup {
                true => self.statoSaldo = Box::new(Argento),
                false => self.statoSaldo = Box::new(Oro)
            },
        }

        self
    }
}