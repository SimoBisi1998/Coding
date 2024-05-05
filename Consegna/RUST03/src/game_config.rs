use std::cell::Cell;

use rand::Rng;

use crate::{Matrix, CellValue, Flip};

#[derive(Clone)]
pub struct GameConfig {
    matrix : Matrix,
    player : Player
}


#[derive(Clone)]
pub struct Player {
    direzione : Direction,
    placement : (i32, i32),
    strong : i32
}


#[derive(Clone)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right
}

impl GameConfig {
    pub fn new (matrice : Matrix, player : Player) -> Self {
        GameConfig { matrix: matrice, player: player }
    }

    pub fn changePlayerPosition(&self, resultFlip : Flip)-> Self {
        let mut clone: GameConfig = self.clone();

        if self.player.strong>0 {
            for i in 0..clone.matrix.rows {
                for j in 0..clone.matrix.columns {
                    match clone.matrix.data[i][j] {
                        CellValue::Player =>{
                            if resultFlip == Flip::Cross {
                                clone.player.selectRandomDirection();
                            }

                            match clone.player.direzione {
                                Direction::Up => {
                                    clone.newCellType(i-1,j);
                                    println!("*********");
                                    println!("Nuovo  round! - Forza rimasta -> {}",clone.player.strong);
                                    clone.matrix.printMatrix();
                                    return clone
                                },
                                Direction::Down => {
                                    clone.newCellType(i+1,j);
        
                                    println!("*********");
                                    println!("Nuovo  round! - Forza rimasta -> {}",clone.player.strong);
                                    clone.matrix.printMatrix();
                                    return clone
                                },
                                Direction::Left => {
                                    clone.newCellType(i,j-1);
        
                                    println!("*********");
                                    println!("Nuovo  round! - Forza rimasta -> {}",clone.player.strong);
                                    clone.matrix.printMatrix();
                                    return clone
                                },
                                Direction::Right => {
                                    clone.newCellType(i,j+1);
                                    println!("*********");
                                    println!("Nuovo  round! - Forza rimasta -> {}",clone.player.strong);
                                    clone.matrix.printMatrix();
                                    return clone
                                }
                            }
                        },
                        CellValue::Wall => {},
                        CellValue::Food(_) => {},
                        CellValue::Poison(_) => {},
                        CellValue::Empty => {},
                    }
                }
            }
        }else {
            println!("HAI PERSO!");
        }


        clone
    }

    pub fn newCellType(&mut self, i : usize, j : usize) -> (){
        match self.matrix.data[i][j] {
            CellValue::Wall => match self.player.direzione{
                Direction::Up => self.player.direzione = Direction::Down,
                Direction::Down => self.player.direzione = Direction::Up,
                Direction::Left => self.player.direzione = Direction::Right,
                Direction::Right => self.player.direzione = Direction::Left,
            },
            CellValue::Player => {},
            CellValue::Food(number) => {
                self.player.strong += number;
                match self.player.direzione {
                    Direction::Up => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i+1][j] = CellValue::Empty;
                    },
                    Direction::Down => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i-1][j] = CellValue::Empty;
                    },
                    Direction::Left => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j+1] = CellValue::Empty;
                    },
                    Direction::Right => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j-1] = CellValue::Empty;
                    },
                }   
            },
            CellValue::Poison(number) => {
                self.player.strong -= number;
                match self.player.direzione {
                    Direction::Up => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i+1][j] = CellValue::Empty;
                    },
                    Direction::Down => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i-1][j] = CellValue::Empty;
                    },
                    Direction::Left => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j+1] = CellValue::Empty;
                    },
                    Direction::Right => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j-1] = CellValue::Empty;
                    },
                }  
            },
            CellValue::Empty => {
                match self.player.direzione {
                    Direction::Up => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i+1][j] = CellValue::Empty;
                    },
                    Direction::Down => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i-1][j] = CellValue::Empty;
                    },
                    Direction::Left => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j+1] = CellValue::Empty;
                    },
                    Direction::Right => {
                        self.matrix.data[i][j] = CellValue::Player;
                        self.matrix.data[i][j-1] = CellValue::Empty;
                    },
                }
                
            },
        }

    }
}

impl Player {
    pub fn new(dir : Direction, place : (i32,i32), strong : i32 ) -> Self{
        Player { direzione: dir, placement: place, strong: strong }
    }

    pub fn selectRandomDirection(&mut self) {
        let mut rng = rand::thread_rng();

        let mut randomValue = rng.gen_range(1..=4);
        match randomValue {
            1 => self.direzione = Direction::Up,
            2 => self.direzione = Direction::Down,
            3 => self.direzione = Direction::Left,
            4 => self.direzione = Direction::Right,
            _ => {}
        }
    }
}