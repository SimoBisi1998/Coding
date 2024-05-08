use core::{fmt, num};
use std::cell::Cell;
use rand::Rng;

use crate::config::game_config::CellValue;

use super::game_config::{Matrix, Flip};

#[derive(Clone)]
pub struct GameConfig {
    pub matrix : Matrix,
    pub player : Player
}

impl fmt::Display for Player {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Player:\n  - Direzione: {:?}\n  - Placement: {:?}\n  - Strong: {}", self.direzione, self.placement, self.strong)
    }
}

impl fmt::Display for GameConfig {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "PLAYER:\n\tDirection: {}\n\tPosition: {}\n\tStrength: {}\nFIELD:\n{}\n",self.player.direzione,self.player.placement,self.player.strong,GameConfig::print_matrix(&self.matrix))
    }
}

#[derive(Clone,Copy)]
pub struct Player {
    pub direzione : Direction,
    pub placement : Coordinate,
    pub strong : i32
}


#[derive(Clone,Debug,Copy,PartialEq)]
pub struct Coordinate(pub i16,pub i16);

impl fmt::Display for Coordinate {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.0, self.1)
    }
}

#[derive(Clone,Debug,Copy,PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right
}

impl fmt::Display for Direction {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Direction::Up => write!(f, "Up"),
            Direction::Down => write!(f, "Down"),
            Direction::Left => write!(f, "Left"),
            Direction::Right => write!(f, "Right")
        }
    }
}


impl GameConfig {
    pub fn new (matrice : Matrix, player : Player) -> Self {
        GameConfig { matrix: matrice, player: player }
    }

    pub fn loopOnMatrix(&self, resultFlip : Flip) -> Option<Self> {

        let mut clone: GameConfig = self.clone();

        for i in 0..self.matrix.rows {
            for j in 0..self.matrix.columns {
                match self.matrix.data[i][j] {
                    CellValue::Player => match self.verifyPlayerPosition(resultFlip,i,j) {
                        Some(gameConfig) => clone = gameConfig,
                        None => {},
                    },
                    CellValue::Food(num) | CellValue::Poison(num) => {},
                    CellValue::Empty | CellValue::Wall => {},
                }
            }
        }

        Some(clone)
    }

    pub fn verifyPlayerPosition(&self, resultFlip : Flip, i : usize, j : usize)-> Option<Self> {
        let mut clone: GameConfig = self.clone();

        if self.player.strong>0 {
            println!("\n*********");
            println!("Nuovo  round!");
            println!("- Forza rimasta -> {}",clone.player.strong);
            println!("-Direzione attuale -> {}",clone.player.direzione);
            println!("-Posizionamento -> {}",clone.player.placement);
            match clone.matrix.data[i][j] {
                CellValue::Player =>{
                    if resultFlip == Flip::Cross {
                        clone.player.selectRandomDirection();
                    }

                    match clone.player.direzione {
                        Direction::Up => {
                            clone.newCellType(i-1,j);
                        },
                        Direction::Down => {
                            clone.newCellType(i+1,j);
                        },
                        Direction::Left => {
                            clone.newCellType(i,j-1);
                        },
                        Direction::Right => {
                            clone.newCellType(i,j+1);
                        }
                    }
                    
                    GameConfig::print_matrix(&clone.matrix);
                    return Some(clone);
                },
                CellValue::Wall => {},
                CellValue::Food(_) => {},
                CellValue::Poison(_) => {},
                CellValue::Empty => {},
            }
        }else {
            return None
        }

        Some(clone)
    }

    pub fn newCellType(&mut self, i : usize, j : usize) -> (){
        match self.isWallOrFoodOrPoisonOrEmpty(i, j) {
            CellValue::Wall => match self.player.direzione{
                Direction::Up => self.setNewDirection(Direction::Down),
                Direction::Down => self.setNewDirection(Direction::Up),
                Direction::Left => self.setNewDirection(Direction::Right),
                Direction::Right => self.setNewDirection(Direction::Left),
            },
            CellValue::Player => {},
            CellValue::Food(number) | CellValue::Poison(number) => {
                if self.matrix.data[i][j] == CellValue::Food(number) {
                    self.player.eatFood(number);
                }else {
                    self.player.eatPoison(number);
                }
                
                match self.player.direzione {
                    Direction::Up => {
                        self.changePlayerPositionToUp(i,j);
                    },
                    Direction::Down => {
                        self.changePlayerPositionToDown(i, j);
                    },
                    Direction::Left => {
                        self.changePlayerPositionToLeft(i, j);
                    },
                    Direction::Right => {
                        self.changePlayerPositionToRight(i, j);
                    },
                }   
            },
            CellValue::Empty => {
                match self.player.direzione {
                    Direction::Up => {
                        self.changePlayerPositionToUp(i, j);
                    },
                    Direction::Down => {
                        self.changePlayerPositionToDown(i, j);
                    },
                    Direction::Left => {
                        self.changePlayerPositionToLeft(i, j);
                    },
                    Direction::Right => {
                        self.changePlayerPositionToRight(i, j);
                    },
                }
                
            },
        }

    }

    pub fn setNewDirection(&mut self,newDir : Direction) -> (){
        self.player.direzione = newDir;
    }

    pub fn changePlayerPositionToUp(&mut self, i : usize, j : usize){
        self.matrix.data[i][j] = CellValue::Player;
        self.matrix.data[i+1][j] = CellValue::Empty;
    }

    pub fn changePlayerPositionToDown(&mut self, i : usize, j : usize){
        self.matrix.data[i][j] = CellValue::Player;
        self.matrix.data[i-1][j] = CellValue::Empty;
    }

    pub fn changePlayerPositionToLeft(&mut self, i : usize, j : usize){
        self.matrix.data[i][j] = CellValue::Player;
        self.matrix.data[i][j+1] = CellValue::Empty;
    }

    pub fn changePlayerPositionToRight(&mut self, i : usize, j : usize){
        self.matrix.data[i][j] = CellValue::Player;
        self.matrix.data[i][j-1] = CellValue::Empty;
    }

    pub fn isWallOrFoodOrPoisonOrEmpty(&self, i : usize, j : usize) -> CellValue{
        self.matrix.data[i][j]
    }

    pub fn print_matrix(matrix: &Matrix) -> String{
        let mut matrix_str = String::from("");
    
        for i in 0..=matrix.rows {
            println!("");
            println!("");
            for j in 0..=matrix.columns{
                if let Some(cell) = matrix.get(i, j) {
                    match cell {
                        CellValue::Wall => print!(" X "),
                        CellValue::Food(value) => print!(" + "),
                        CellValue::Poison(value) => print!(" - "),
                        CellValue::Player => print!(" G "),
                        CellValue::Empty => print!(" / "),
                    }
    
                    let test = format!("{} ",cell);
                    matrix_str.push_str(&test);
                }

                matrix_str.push_str("\n");
            }
        }
    
        matrix_str
    }

}

impl Player {
    pub fn new(dir : Direction, place : (i16,i16), strong : i32 ) -> Self{
        Player { direzione: dir, placement: Coordinate(place.0,place.1), strong: strong }
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

    pub fn getPlayerDirection(&self) -> Direction {
        self.direzione
    }

    pub fn eatFood(&mut self, n : i32) {
        self.strong+=n;
    }

    pub fn eatPoison(&mut self, n : i32) {
        self.strong-=n;
    }
}

