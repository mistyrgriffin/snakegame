var grid = document.querySelector(".grid");
var startButton = document.getElementById("start");
var displayScore = document.getElementById("score");
var gridSquares = [];
var snakeBody = [2,1,0];
var snakeDirection = 1;
var width = 10;
var appleSquare = 0;
var score = 0;
var timeLapse = 1000;
var speed = 0.9;
var timeTicker = 0;

function createGrid() {
    for (var i=0; i < width*width; i++) {
        var square = document.createElement("div");
        square.classList.add("square")
        grid.appendChild(square);
        gridSquares.push(square);
    }
}
createGrid();

snakeBody.forEach(index => gridSquares[index].classList.add("snake"));

function startGame() {
    snakeBody.forEach(index => gridSquares[index].classList.remove("snake"));
    gridSquares[appleSquare].classList.remove("apple");
    clearInterval(timeTicker);
    snakeBody = [2,1,0];
    score = 0;
    displayScore.textContent = score;
    snakeDirection = 1;
    timeLapse = 1000;
    generateApples();
    snakeBody.forEach(index => gridSquares[index].classList.add("snake"));
    timeTicker = setInterval(move, timeLapse);
}

function move() {
    if (
        (snakeBody[0] + width >= width*width && snakeDirection === width) ||
        (snakeBody[0] % width === width-1 && snakeDirection === 1) ||
        (snakeBody[0] % width === 0 && snakeDirection === -1) ||
        (snakeBody[0] - width < 0 && snakeDirection === -width) ||
        gridSquares[snakeBody[0] + snakeDirection].classList.contains("snake")
    )
    return clearInterval(timeTicker);

    var tail = snakeBody.pop();
    gridSquares[tail].classList.remove("snake");
    snakeBody.unshift(snakeBody[0] + snakeDirection);
    
    if (gridSquares[snakeBody[0]].classList.contains("apple")) {
        gridSquares[snakeBody[0]].classList.remove("apple");
        gridSquares[tail].classList.add("snake");
        snakeBody.push(tail);
        generateApples();
        score++
        displayScore.textContent = score;
        clearInterval(timeTicker);
        timeLapse = timeLapse * speed;
        timeTicker = setInterval(move, timeLapse);
    }
    
    gridSquares[snakeBody[0]].classList.add("snake");
}

function generateApples() {
    do {
        appleSquare = Math.floor(Math.random() * gridSquares.length)
    } while (gridSquares[appleSquare].classList.contains("snake"))
    gridSquares[appleSquare].classList.add("apple")
}
generateApples();

function control(e) {
    if (e.key === "ArrowLeft") {
        snakeDirection = -1
    } else if (e.key === "ArrowUp") {
        snakeDirection = -width;
    } else if (e.key === "ArrowRight") {
        snakeDirection = 1
    } else if (e.key === "ArrowDown") {
        snakeDirection = +width;
    }
}
document.addEventListener("keydown", control);
startButton.addEventListener("click", startGame);


