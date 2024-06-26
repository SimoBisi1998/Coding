use std::{cell::Cell, env::{self, args}};
use rand::prelude::*;
mod game_config;
use game_config::{GameConfig, Player,Direction};

#[derive(Clone, Debug,PartialEq)]
pub struct Matrix {
    rows: usize,
    columns: usize,
    data: Vec<Vec<CellValue>>,
}

#[derive(Clone, Debug,PartialEq)]
enum CellValue {
    Wall,
    Player,
    Food(i32),
    Poison(i32),
    Empty
}

#[derive(PartialEq)]
enum Flip {
    Head,
    Cross
}

impl Matrix {
    fn new(rows: usize, columns: usize) -> Self {
        let data = vec![vec![CellValue::Wall; columns]; rows];
        Matrix {
            rows,
            columns,
            data,
        }
    }

    fn get(&self, rows: usize, columns: usize) -> Option<&CellValue> {
        self.data.get(rows)?.get(columns)
    }

    fn getRows(&self) -> usize {
        self.rows
    }

    fn getCols(&self) -> usize {
        self.columns
    }

    fn allocMatrix(&mut self, n: i16, m: i16) -> () {
        for i in 0..self.rows {
            for j in 0..self.columns {
                if i != 0 && i != self.rows - 1 && j != 0 && j != self.columns - 1 {
                    self.data[i][j] = self.randomValueForFoodAndPosion();
                } else {
                    self.data[i][j] = CellValue::Wall;
                }
            }
        }

        let mut playerPlace: (usize, usize)= self.randomPositionForPlayer();
        self.data[playerPlace.0][playerPlace.1] = CellValue::Player;
    }

    fn randomValueForFoodAndPosion(&self) -> CellValue{
        let mut rng = rand::thread_rng();

        let randomNumber = rng.gen_range(1..5);
        if randomNumber>2 {
            CellValue::Food(randomNumber)
        }else {
            CellValue::Poison(randomNumber)
        }
    }

    fn randomPositionForPlayer(&self) -> (usize,usize) {
        let mut rng = rand::thread_rng();

        let x = rng.gen_range(1..self.rows-1);
        let y = rng.gen_range(1..self.columns-1);

        (x,y)
    }

    pub fn printMatrix(&self) -> () {
        for i in 0..=self.rows {
            println!("");
            println!("");
            for j in 0..=self.columns {
                if let Some(cell) = self.get(i, j) {
                    match cell {
                        CellValue::Wall => print!(" X "),
                        CellValue::Food(value) => print!(" + "),
                        CellValue::Poison(value) => print!(" - "),
                        CellValue::Player => print!(" G "),
                        CellValue::Empty => print!(" / "),
                    }
                }
            }
        }
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

    pub fn play(self) -> () {
        let mut game: GameConfig = GameConfig::new(self,Player::new(Direction::Up,(6,6),5));
        let mut MAX_CHANCE = 10;

        while MAX_CHANCE != 0{
            match Self::flipCoin() {
                Flip::Head => if let Some(new_game) = game.changePlayerPosition(Flip::Head) {
                    game = new_game;
                } else {
                    println!("HAI PERSO!");
                    break; 
                }
                Flip::Cross => if let Some(new_game) = game.changePlayerPosition(Flip::Cross) {
                    game = new_game;
                } else {
                    println!("HAI PERSO!");
                    break; 
                }, 
            };

            MAX_CHANCE-=1;
        }

        if MAX_CHANCE == 0 {
            println!("HAI VINTO COMPLIMENTI!");
        }
        
    }

}

fn main() {
    let args : Vec<String> = env::args().collect();

    let rows = args.get(1).unwrap();
    let columns = args.get(2).unwrap();
    let food = args.get(3).unwrap();
    let poison = args.get(4).unwrap();


    let mut matrix = Matrix::new(rows.parse().unwrap(), columns.parse().unwrap());
    let v = matrix.allocMatrix(food.parse().unwrap(), poison.parse().unwrap());

    //print matrix
    println!("Primo round!");
    matrix.printMatrix();
    matrix.play();
}
