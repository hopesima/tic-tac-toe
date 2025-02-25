class Game {
    constructor() {
        this.Move = CROSS;
        this.Field = [[-10, -10, -10],[-10, -10, -10],[-10, -10, -10]]
        this.Counter = 0;
        this.Win = false;
    }
}

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let GAME = new Game();

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (GAME.Win){
        return;
    }
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (GAME.Field[row][col] === -10) {
        renderSymbolInCell(GAME.Move, row, col);        
        GAME.Field[row][col] = GAME.Move == CROSS ? 1 : 0;
        GAME.Counter += 1;
    }
    else {
        return;
    }
    if (GAME.Move === CROSS) {
        GAME.Move = ZERO;
    } 
    else {
        GAME.Move = CROSS;
    }
    let winner = findWinner();
    if (winner == 0) {
        setTimeout(() => alert('Победил Нолик'),500);
        GAME.Win = true;
        return;
    } else if (winner == 3) {
        setTimeout(() => alert('Победил Крестик'), 500);
        GAME.Win = true;
        return;
    }
    if (GAME.Counter === 9) {
        setTimeout(() => alert('Победила Дружба!'), 500);
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function findWinner () {
    const sum = [
        [GAME.Field[0][0] + GAME.Field[0][1] + GAME.Field[0][2], [[0, 0], [0, 1], [0, 2]]],
        [GAME.Field[1][0] + GAME.Field[1][1] + GAME.Field[1][2], [[1, 0], [1, 1], [1, 2]]],
        [GAME.Field[2][0] + GAME.Field[2][1] + GAME.Field[2][2], [[2, 0], [2, 1], [2, 2]]],
        [GAME.Field[0][0] + GAME.Field[1][0] + GAME.Field[2][0], [[0, 0], [1, 1], [2, 0]]],
        [GAME.Field[0][1] + GAME.Field[1][1] + GAME.Field[2][1], [[0, 1], [1, 1], [2, 1]]],
        [GAME.Field[0][2] + GAME.Field[1][2] + GAME.Field[2][2], [[0, 2], [1, 1], [2, 2]]],
        [GAME.Field[0][0] + GAME.Field[1][1] + GAME.Field[2][2], [[0, 0], [1, 1], [2, 2]]],
        [GAME.Field[0][2] + GAME.Field[1][1] + GAME.Field[2][0], [[0, 2], [1, 1], [2, 0]]]
    ]
    for (const item of sum) {
        if (item[0] == 0){
            draw(item[1])
            return 0;
        }
        if (item[0] == 3){
            draw(item[1])
            return 3;
        }
    }
    return -1;
}

function draw(indexes) {
    indexes = indexes.map(x => x.join(" "))
    const matrix = [
        document.querySelectorAll("tr")[0].querySelectorAll("td"),
        document.querySelectorAll("tr")[1].querySelectorAll("td"),
        document.querySelectorAll("tr")[2].querySelectorAll("td"),
    ] 

    console.log(matrix);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (indexes.includes(`${i} ${j}`)){
                console.log(matrix[i][j]);
                matrix[i][j].style.background = "red";
            }
        }
    }
}   

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    GAME = new Game();
    const matrix = [
        document.querySelectorAll("tr")[0].querySelectorAll("td"),
        document.querySelectorAll("tr")[1].querySelectorAll("td"),
        document.querySelectorAll("tr")[2].querySelectorAll("td"),
    ] 

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i][j].style.background = "#fffcd4";
            matrix[i][j].textContent = "";
        }
    }
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
