use std::{cell::Cell, env::{self, args}};
mod config;
use config::game_config::Matrix;

pub fn main() {
    let args : Vec<String> = env::args().collect();

    let rows = args.get(1).unwrap();
    let columns = args.get(2).unwrap();
    let food = args.get(3).unwrap();
    let poison = args.get(4).unwrap();
    let maximum_choice = args.get(5).unwrap();


    let mut matrix = Matrix::new(rows.parse().unwrap(), columns.parse().unwrap());
    let v = matrix.allocMatrix(food.parse().unwrap(), poison.parse().unwrap());

    if matrix.checkCellValues(food.parse().unwrap(), poison.parse().unwrap()) {
        matrix.play(maximum_choice.parse().unwrap());
    }else {
        println!("Il numero di celle non è sufficiente a contenere i food/poision dichiarati")
    }
    
}
