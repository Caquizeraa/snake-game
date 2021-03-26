let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let dir = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground(){
    context.fillStyle = "lightgreen";
    context.fillRect(0 , 0 , 16*box, 16*box);
}

function createPlayer(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood(){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y,box, box);
}

document.addEventListener('keydown',step);

function step(event){
    if(event.keyCode == 65 && dir!="right") dir = "left";
    if(event.keyCode == 87 && dir!="down") dir = "up";
    if(event.keyCode == 68 && dir!="left") dir = "right";
    if(event.keyCode == 83 && dir!="up") dir = "down";
}

function startGame(){


    if(snake[0].x > 15 * box && dir == "right") snake[0].x = 0;
    if(snake[0].x < 0 && dir == "left") snake[0].x = 16 * box;
    if(snake[0].y < 0 && dir == "up") snake[0].y = 16 * box;
    if(snake[0].y> 15 * box && dir == "down") snake[0].y = 0;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(startGame);
            alert("Game over!");
            alert("Press OK to restart!");
            window.location.reload();
        }
    }

    createBackground();
    createPlayer();
    createFood();
    let playerX = snake[0].x;
    let playerY = snake[0].y;

    //Fazendo o player andar
    if(dir=="right") playerX += box;
    if(dir=="left") playerX -= box;
    if(dir=="down") playerY += box;
    if(dir=="up") playerY -= box;

    //Alterar o array
    if(playerX != food.x  || playerY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }   

    let newHead = {
        x: playerX,
        y: playerY
    }
    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);