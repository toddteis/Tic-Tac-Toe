const tileFactory = (name, row, column, marker) => {
    return { name, row, column, marker }
}

const board = [];

board.push(tileFactory("topLeft", 1, 1, ''))
board.push(tileFactory("topCentre", 1, 2, ''));
board.push(tileFactory("topRight", 1, 3, ''));
board.push(tileFactory("midLeft", 2, 1, ''));
board.push(tileFactory("midCentre", 2, 2, ''));
board.push(tileFactory("midRight", 2, 3, ''));
board.push(tileFactory("botLeft", 3, 1, ''));
board.push(tileFactory("botCenter", 3, 2, ''));
board.push(tileFactory("botRight", 3, 3, ''));

console.log(board);