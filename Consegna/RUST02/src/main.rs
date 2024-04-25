///Permette di generare un numero razionale 
#[derive(Debug,PartialEq)]
pub struct Razionali{
    pub num : i32,
    pub denum : i32
}


pub trait Add<Rhs = Self> {
    type Output;
    fn add(self,other : Rhs) -> Self::Output;
}

impl Add<i32> for Razionali{
    type Output = Razionali;

    fn add(self,other : i32) -> Self::Output {
        let mcm = self.mcm(&Razionali::new(other,1));
        
        let first = (mcm/self.denum)*self.num;
        let second = mcm*other;

        Razionali {
            num : first+second,
            denum : mcm
        }   
    }
}

impl Add for Razionali {
    type Output = Razionali;

    fn add(self,other : Self) -> Self::Output {
        let mcm = self.mcm(&other);
        
        let first = (mcm/self.denum)*self.num;
        let second = (mcm/other.denum)*other.num;

        Razionali {
            num : first+second,
            denum : mcm
        }  
    }
}


pub trait Mul<Rhs = Self> {
	type Output;
	fn mul(self, other: Rhs) -> Self::Output;
}

impl Mul<i32> for Razionali{
    type Output = Razionali;

    fn mul(self, rhs: i32) -> Self::Output {
        Razionali {
            num : self.num*rhs,
            denum : self.denum
        }
    }
}

impl Mul for Razionali{
    type Output = Razionali;
    
    fn mul(self, other: Self) -> Self::Output {
        Razionali {
            num : self.num*other.num,
            denum : self.denum*other.denum
        }
    }
}


impl Razionali {

    /// Crea una nuova istanza di Razionali
    /// # Arguments
    /// `a` - un intero a 32 bit
    /// `b` - un intero a 32 bit
    /// # Examples
    /// ```
    /// let number1 = RUST02::Razionali::new(9,16);
    /// assert_eq!(number1.num,9);
    /// assert_eq!(number1.denum,16);
    /// ```
    pub fn new(a:i32,b:i32) -> Razionali {
        Razionali { num: a, denum: b }
    }

    /// Eseguire la somma di due numeri razionali
    /// # Arguments
    /// `rational1` - un istanza di `Razionali`
    /// # Examples
    /// ```
    /// let number1 = RUST02::Razionali::new(1,5);
    /// let number2 =  RUST02::Razionali::new(2,7);
    /// let result = RUST02::Razionali::somma(number1,number2);
    /// assert_eq!(result.num,17);
    /// assert_eq!(result.denum,35);
    /// ```

    pub fn somma(mut rational1:Razionali,mut rational2:Razionali) -> Razionali{
        if rational1.denum == rational2.denum {
            Razionali::new(rational1.num+rational2.num,rational1.denum)
        }else {
            let mcm = Razionali::mcm(&rational1,&rational2);
            if mcm != 0 {
                let mcm = Razionali::mcm(&rational1,&rational2); 
                rational1.num = (mcm/rational1.denum)*rational1.num;
                rational2.num = (mcm/rational2.denum)*rational2.num;

                Razionali::new(rational1.num + rational2.num, mcm)
            }else {
                return Razionali::new(0,0);
            }
        }
    }

    /// Trasformazione di un numero intero in razionale ritornando un numero razionale 
    /// # Arguments
    /// `x` - un intero a 32 bit
    /// # Examples
    /// ```
    /// let number1 = 5;
    /// let result = RUST02::Razionali::int_to_rational(number1);
    /// assert_eq!(result.num,5);
    /// assert_eq!(result.denum,1);
    /// ```
    pub fn int_to_rational(x:i32) -> Razionali{
        Razionali { num: x, denum: 1 }
    }


    /// Calcolo del prodotto tra due numeri razionali
    /// # Arguments
    /// `raz1` - istanza mutabile di `Razionali`
    /// `raz2` - istanza mutabile di `Razionali`
    /// # Examples
    /// ```
    /// let mut ex1 = RUST02::Razionali::new(8,3);
    /// let mut ex2 = RUST02::Razionali::new(7,12);
    /// let result = RUST02::Razionali::prodotto(ex1,ex2);
    /// assert_eq!(result.num,56);
    /// assert_eq!(result.denum,36);
    /// ```
    pub fn prodotto(mut raz1: Razionali, mut raz2: Razionali) -> Razionali {
        Razionali::new(raz1.num*raz2.num,raz1.denum*raz2.denum)
    }

    /// Riduce un numero razionale ai minimi termini
    /// ritornando una struct di Razionali
    /// # Examples 
    /// ```
    /// let mut rat = RUST02::Razionali::riduzione(RUST02::Razionali::new(15,25));
    /// assert_eq!(rat.num, 3);
    /// assert_eq!(rat.denum, 5);
    /// ```
    pub fn riduzione(mut self: Razionali) -> Razionali {
        let mut a = self.num;
        let mut b = self.denum;

        while b != 0 {
            let temp = b;
            b = a % b;
            a = temp;
        }
        let gcd = a;


        self.num /= gcd;
        self.denum /= gcd;

        self
    }

    /// Calcola il minimo comune multiplo tra due numeri e ritorna un i32
    /// # Examples 
    /// ```
    /// let ex1 = RUST02::Razionali::new(10,5);
    /// let ex2 = RUST02::Razionali::new(3,15);
    /// let result = RUST02::Razionali::mcm(&ex1,&ex2);
    /// assert_eq!(result, 15);
    /// ```
    pub fn mcm(&self,other: &Razionali) -> i32{
        let mut mcm;
        if self.denum > other.denum {
            mcm = self.denum;
        } else {
            mcm = other.denum;
        }

        loop{
            if (mcm%self.denum == 0) && (mcm%other.denum == 0){
                break;
            } else{
                mcm=mcm+1;
            }
        }
        mcm
    }

}

#[cfg(test)]
mod test{
    use crate::{Razionali, Mul, Add};


    #[test]
    fn test_to_rational(){
        let newRational = Razionali::int_to_rational(7);
        assert_eq!(newRational.num,7);
        assert_eq!(newRational.denum,1);
    }

    #[test]
    fn testProdotto() {
        assert_eq!(Razionali::new(15,20),Razionali::prodotto(Razionali::new(5,5),Razionali::new(3,4)));
        assert_eq!(Razionali::new(6,15),Razionali::prodotto(Razionali::new(3,5),Razionali::new(2,3)));
    }

    #[test]
    fn testRiduzione() {
        assert_eq!(Razionali::new(2,3),Razionali::riduzione(Razionali::new(8,12)));
        assert_eq!(Razionali::new(2,3),Razionali::riduzione(Razionali::new(24,36)));
        assert_eq!(Razionali::new(3,5),Razionali::riduzione(Razionali::new(15,25)));
        assert_eq!(Razionali::new(3,2),Razionali::riduzione(Razionali::new(9,6)));
    }

   #[test]
    fn testMcm() {
        assert_eq!(9,Razionali::mcm(&Razionali::new(2,3),&Razionali::new(8,9)));
        assert_eq!(15,Razionali::mcm(&Razionali::new(3,5),&Razionali::new(4,3)));
    }

    #[test]
    fn test_somma() {
        assert_eq!(Razionali::new(5,3),Razionali::somma(Razionali::new(2,3),Razionali::new(3,3)));
        assert_eq!(Razionali::new(23,20),Razionali::somma(Razionali::new(3,4),Razionali::new(2,5)));
    }

    #[test]
    fn testMulI32() {
        assert_eq!(Razionali::new(50,3),Razionali::new(10,3).mul(5));
    }

    #[test]
    fn testTraitMul() {
        assert_ne!(Razionali::new(22,3),Razionali::new(5,2).mul(Razionali::new(4,2)));
        assert_eq!(Razionali::new(20,4),Razionali::new(5,2).mul(Razionali::new(4,2)));
    }

    #[test]
    fn testAddI32() {
        assert_eq!(Razionali::new(16,3),Razionali::new(1,3).add(5));
        assert_eq!(Razionali::new(32,5),Razionali::new(2,5).add(6));
    }
    
    #[test]
    fn testTraitAdd() {
        assert_eq!(Razionali::new(11,15),Razionali::new(1,3).add(Razionali::new(2,5)));
        assert_eq!(Razionali::new(11,12),Razionali::new(2,3).add(Razionali::new(1,4)));
    }

}

fn main() {}
