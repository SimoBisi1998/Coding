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
pub enum TipoSaldo {
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

    /// Crea una nuova istanza di ContoBancario
    /// # Arguments
    /// `clientName` - una stringa che rappresenta il nome del cliente
    /// `saldo` - un intero a 32 bit corrispondente al saldo del conto bancario
    /// `min` - un intero a 32 bit corrispondente al limite inferiore del saldo
    /// `max` - un intero a 32 bit corrispondente al limite superiore del saldo
    /// `interesse` - un intero a 32 bit corrispondente all'interesse del conto bancario
    /// # Examples
    /// ```
    /// use RUST05::ContoBancario;
    /// let mut number1 = ContoBancario::new("Luca".to_string(),50,30,80,20);
    /// assert_eq!("Luca",number1.cliente);
    /// assert_eq!(50,number1.saldo);
    /// assert_eq!(30,number1.limite_inf);
    /// assert_eq!(80,number1.limite_sup);
    /// assert_eq!(20,number1.interesse);
    /// ```
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

    /// Aggiunge un intero al saldo del conto bancario
    /// # Arguments
    /// `&mut self` - un riferimento ad un'istanza mutabile di conto bancario
    /// `value` - un intero a 32 bit da aggiungere al saldo
    /// # Examples
    /// ```
    /// use RUST05::ContoBancario;
    /// let mut number1 = ContoBancario::new("Luca".to_string(),50,30,80,20);
    /// assert_eq!(70,number1.aggiungiSaldo(20).saldo);
    /// ```
    pub fn aggiungiSaldo(&mut self,value : i32) -> &mut Self{
        //aggiungo il saldo
        self.saldo = self.statoSaldo.deposita(self.saldo, value);

        //cambio lo stato
        self.changeState();

        //mostro lo stato
        self.statoSaldo.showStatoSaldo();

        self
    }

    /// Rimuove un intero dal saldo del conto bancario
    /// # Arguments
    /// `&mut self` - un riferimento ad un'istanza mutabile di conto bancario
    /// `value` - un intero a 32 bit da aggiungere al saldo
    /// # Examples
    /// ```
    /// use RUST05::ContoBancario;
    /// let mut number1 = ContoBancario::new("Andrea".to_string(),50,60,80,20);
    /// assert_eq!(60,number1.preleva(20).saldo);
    /// ```
    pub fn preleva(&mut self, value : i32) -> &mut Self{
        //aggiungo il saldo
        self.saldo = self.statoSaldo.preleva(self.saldo, value);

        //se lo stato è rosso/oro pago interessi
        if self.statoSaldo.is_type() == TipoSaldo::Rosso {
            self.saldo += self.statoSaldo.pagaInteressi(self.saldo, self.interesse);

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

    /// Cambia lo stato del conto in base al saldo
    /// # Arguments
    /// `&mut self` - un riferimento ad un'istanza mutabile di conto bancario
    /// # Examples
    /// ```
    /// use RUST05::ContoBancario;
    /// let mut number1 = ContoBancario::new("Andrea".to_string(),50,60,80,20);
    /// number1.changeState();
    /// assert_eq!(RUST05::TipoSaldo::Rosso,number1.statoSaldo.is_type());
    /// ```
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