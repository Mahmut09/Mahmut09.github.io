// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

// Загрузка звука
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let botScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
botScore.src = "sounds/botScore.mp3";
userScore.src = "sounds/userScore.mp3";

// Параметры мяча
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// Доска (user)
const user = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Доска (Bot)
const bot = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Центр
const mid = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "red"
}

// Рисуем доски
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Рисуем мяч
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// Отслеживание движение мышки
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// если игрок или комп забили гол, обновляет мяч
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// Рисуем центр поля
function drawmid(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(mid.x, mid.y + i, mid.width, mid.height, mid.color);
    }
}

// Счет
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// обнаружение столкновений
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update function, the function that does all calculations
// функция обновления, функция, которая делает все вычисления
function update(){
    
    // change the score of players, if the ball goes to the left "ball.x<0" botputer win, else if "ball.x > canvas.width" the user win
    // Изменение счета
    
    if( ball.x - ball.radius < 0 ){
        bot.score++;
        botScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // the ball has a velocity
    // скорость мяча

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // игра бота, мы можем победать его
    // simple AI
    // легкий бот
    bot.y += ((ball.y - (bot.y + bot.height/2)))*0.1;
    
    // когда шар сталкивается с нижней и верхней стенками, мы инвертируем скорость 

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
    // we check if the paddle hit the user or the bot paddle
    // Проверка ударился ли мяч о доску игрока или бота
    let player = (ball.x + ball.radius < canvas.width/2) ? user : bot;
    
    // если мяч ударился о доску
    if(collision(ball,player)){
        // звук удара о доску
        hit.play();
        // проверяем куда ударил мяч доску
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // нормализуя значение collidePoint, нам нужно получить числа от -1 до 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // когда мяч попадает в верхнюю часть доски, мы хотим, чтобы мяч принял угол -45 градусов

        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // когда мяч попадает в центр лопатки, мы хотим, чтобы мяч принял угол 0 градусов

        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // когда мяч касается нижней части весла, мы хотим, чтобы мяч принял 45 градусов

        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        // изменить направление скорости X и Y после удара о доску
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        // ускорять мяч каждый раз, когда доска ударяет его
        ball.speed += 0.1;
    }
}

// render function, the function that does al the drawing
function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // draw the user score to the left
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // draw the bot score to the right
    drawText(bot.score,3*canvas.width/4,canvas.height/5);
    
    // draw the mid
    drawmid();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the bot's paddle
    drawRect(bot.x, bot.y, bot.width, bot.height, bot.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

