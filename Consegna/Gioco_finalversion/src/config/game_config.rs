use core::fmt;
use rand::Rng;
use super::game_struct::{GameConfig, Player, Direction};

#[derive(Clone, Debug,PartialEq)]
pub struct Matrix {
    pub rows: usize,
    pub columns: usize,
    pub data: Vec<Vec<CellValue>>,
}

#[derive(Clone, Debug,PartialEq,Copy)]
pub enum CellValue {
    Wall,
    Player,
    Food(i32),
    Poison(i32),
    Empty
}

impl fmt::Display for CellValue {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CellValue::Wall => write!(f, "Wall"),
            CellValue::Player => write!(f, "Player"),
            CellValue::Food(value) => write!(f, "Food({})", value),
            CellValue::Poison(value) => write!(f, "Poison({})", value),
            CellValue::Empty => write!(f, "Empty"),
        }
    }
}

#[derive(PartialEq,Clone, Copy)]
pub enum Flip {
    Head,
    Cross
}

impl Matrix {
    pub fn new(rows: usize, columns: usize) -> Self {
        let data = vec![vec![CellValue::Wall; columns]; rows];
        Matrix {
            rows,
            columns,
            data,
        }
    }

    pub fn get(&self, rows: usize, columns: usize) -> Option<&CellValue> {
        self.data.get(rows)?.get(columns)
    }

    pub fn getRows(&self) -> usize {
        self.rows
    }

    pub fn getCols(&self) -> usize {
        self.columns
    }

    pub fn allocMatrix(&mut self, mut n: i16,mut m: i16) -> () {
        for i in 0..self.rows {
            for j in 0..self.columns {
                if i != 0 && i != self.rows - 1 && j != 0 && j != self.columns - 1 {
                    if n>0 || m>0 {
                        self.data[i][j] = self.randomValueForFoodAndPosion(&n, &m);
                        match self.data[i][j] {
                            CellValue::Food(num) => {n-=1},
                            CellValue::Poison(num) => {m-=1},
                            CellValue::Empty | CellValue::Wall | CellValue::Player => {}
                        }
                    }else {
                        self.data[i][j] = CellValue::Empty;
                    }
                    
                } else {
                    self.data[i][j] = CellValue::Wall;
                }
            }
        }

        let mut playerPlace: (usize, usize)= self.randomPositionForPlayer();
        self.data[playerPlace.0][playerPlace.1] = CellValue::Player;    
    }

    pub fn checkCellValues(&self,mut n: i16, mut m: i16)-> bool {
        let mut playerCell:i16 = 1;

        for i in 0..self.rows {
            for j in 0..self.columns {
                match self.data[i][j] {
                    CellValue::Wall | CellValue::Empty => {},
                    CellValue::Player => playerCell-=1,
                    CellValue::Food(_) => n-=1,
                    CellValue::Poison(_) => m-=1,
                }
            }
        }

        if n==0 && m==0{
            true
        }else {
            false
        }
    }

    pub fn randomValueForFoodAndPosion(&self, mut n: &i16, mut m: &i16) -> CellValue{
        if *n==0 && *m==0 {return CellValue::Empty}
        
        let mut rng = rand::thread_rng();
        let randomNumber = rng.gen_range(1..=2);
    
        if randomNumber==1{
            if *n>0 {
                CellValue::Food(randomNumber)
            }else {
                if *m>0 {
                    CellValue::Poison(randomNumber)
                }else {
                    CellValue::Empty
                }
            }
        }else {
            if *m>0 {
                CellValue::Poison(randomNumber)
            }else {
                if *n>0 {
                    CellValue::Food(randomNumber)
                }else {
                    CellValue::Empty
                }
                
            }
            
        }
    }

    pub fn randomPositionForPlayer(&self) -> (usize,usize) {
        let mut findEmptyCell = false;
        let mut x = 0;
        let mut y= 0;

        for i in 0..self.rows {
            for j in 0..self.columns {
                let mut rng = rand::thread_rng();

                x = rng.gen_range(1..self.rows-1);
                y = rng.gen_range(1..self.columns-1);
    
                if self.data[x][y] == CellValue::Empty{
                    findEmptyCell = true;
                    return (x,y)
                }
            }
        }
        
        (x,y)
        
    }

    pub fn flipCoin() -> Flip {
        let mut coin = rand::thread_rng();

        let randomValue = coin.gen_bool(0.5);
        if randomValue == true {
            Flip::Head
        }else {
            Flip::Cross
        }
    }

    pub fn play(self,mut max_chance : i16) -> () {
        let mut game: GameConfig = GameConfig::new(self,Player::new(Direction::Up,(6,6),5));

        while max_chance != 0{
            match Self::flipCoin() {
                Flip::Head => if let Some(new_game) = game.loopOnMatrix(Flip::Head) {
                    game = new_game;
                } else {
                    println!("\nHAI PERSO!");
                    break; 
                }
                Flip::Cross => if let Some(new_game) = game.loopOnMatrix(Flip::Cross) {
                    game = new_game;
                } else {
                    println!("\nHAI PERSO!");
                    break; 
                }, 
            };

            max_chance-=1;
        }

        if max_chance == 0 {
            println!("\nHAI VINTO!");
        }
        
    }

}