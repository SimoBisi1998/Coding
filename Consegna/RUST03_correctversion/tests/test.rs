use game::config::game_config::*;
use game::config::game_struct::*;

#[test]
fn testAllocMatrix() {
    let mut matrx = Matrix::new(6,6);
    let player = Player { 
        direzione: Direction::Left,
        placement: Coordinate{0 : 4, 1 : 4},
        strong: 10 
    };

    matrx.allocMatrix(0, 12);
    GameConfig::print_matrix(&matrx);
    assert_eq!(false,matrx.checkCellValues(0,12));
    matrx.allocMatrix(0, 18);
    assert_eq!(false,matrx.checkCellValues(0,18));
}

#[test]
fn testWallUpPlayer() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Up,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });

    assert_eq!(Direction::Up,gameConfig.player.getPlayerDirection());
    gameConfig.newCellType(0,1);
    assert_eq!(Direction::Down,gameConfig.player.direzione);
}

#[test]
fn testWallLeftPlayer() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Left,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });
    assert_eq!(Direction::Left,gameConfig.player.getPlayerDirection());
    gameConfig.newCellType(0, 1);
    assert_eq!(Direction::Right,gameConfig.player.getPlayerDirection());
}

#[test]
fn testWallRightPlayer() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Right,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });
    assert_eq!(Direction::Right,gameConfig.player.getPlayerDirection());
    gameConfig.newCellType(0, 1);
    assert_eq!(Direction::Left,gameConfig.player.getPlayerDirection());
}

#[test]
fn testWallDownPlayer() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);


    GameConfig::print_matrix(&matrx);
    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Down,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });

    assert_eq!(Direction::Down,gameConfig.player.getPlayerDirection());
    gameConfig.newCellType(0, 1);
    assert_eq!(Direction::Up,gameConfig.player.getPlayerDirection());

    
}

#[test]
fn testEatFood() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Down,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });
    
    gameConfig.player.eatFood(5);
    assert_eq!(15,gameConfig.player.strong);
    gameConfig.player.eatFood(5);
    assert_eq!(20,gameConfig.player.strong);
}

#[test]
fn testEatPoision() {
    let mut matrx = Matrix::new(5,5);
    matrx.allocMatrix(1, 1);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,Player { 
        direzione: Direction::Down,
        placement: Coordinate{0 : 1, 1 : 1},
        strong: 10 
    });
    
    gameConfig.player.eatPoison(5);
    assert_eq!(5,gameConfig.player.strong);

    gameConfig.player.eatPoison(3);
    assert_eq!(2,gameConfig.player.strong)
}

#[test]
fn testIsWallOrNot(){
    let mut matrx = Matrix::new(4,4);
    let player = Player { 
        direzione: Direction::Left,
        placement: Coordinate{0 : 4, 1 : 4},
        strong: 10 
    };
    matrx.allocMatrix(5, 5);

    let mut gameConfig: GameConfig = GameConfig::new(matrx,player);
    
    assert_eq!(CellValue::Wall,gameConfig.isWallOrFoodOrPoisonOrEmpty(0,3));
}