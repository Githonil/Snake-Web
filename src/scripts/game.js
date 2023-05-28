const WIDTH = 50;
const HEIGHT = 50;

let widthScreen = document.getElementById("main").offsetWidth;
let heightScreen = document.getElementById("main").offsetHeight;
let aspect = widthScreen / heightScreen;

let widthSize = widthScreen / WIDTH;
let heightSize = heightScreen / HEIGHT;



let score = 0;

let running = true;
let pause = false;



const snake = new Snake(widthSize, heightSize);
const apple = new Apple(WIDTH, HEIGHT, widthSize, heightSize);



addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
            snake.goUp();
            break;
        case "ArrowDown":
        case "KeyS":
            snake.goDown();
            break;
        case "ArrowRight":
        case "KeyD":
            snake.goRight();
            break;
        case "ArrowLeft":
        case "KeyA":
            snake.goLeft();
            break;



        case "Escape":
            if (running)
                pauseButton();
            break;
        default:
            break;
    }
});



addEventListener("mouseup", (event) => {
    if (widthScreen > 800)
        return;

    const widthPart = widthScreen / 3;
    const heightPart = heightScreen / 3;

    const posX = event.clientX;
    const posY = event.clientY;

    const isMiddleWidth = posX > widthPart && posX < widthPart * 2;
    const isMiddleHeight = posY > heightPart && posY < heightPart * 2;

    if (posX <= widthPart && isMiddleHeight) {
        snake.goLeft();
    }
    else if (posX >= widthPart * 2 && isMiddleHeight) {
        snake.goRight();
    }
    else if (posY <= heightPart && isMiddleWidth) {
        snake.goUp();
    }
    else if (posY >= heightPart * 2 && isMiddleWidth) {
        snake.goDown();
    }
});



/**
 * Cette fonction vérifie la colision entre la pomme et le serpent.
 * 
 * @return Renvoie true si il y a une colision, false sinon.
 */
function collide() {
    if (snake.getCoordX() == apple.getCoordX() && snake.getCoordY() == apple.getCoordY())
        return true;
    return false;
}



/**
 * Cette fonction vérifie si le serpent est sortie du terrain.
 * 
 * @return Renvoie true si le serpent est en dehors du terrain, false sinon.
 */
function isOut() {
    if (snake.getCoordX() < 0 || snake.getCoordX() >= WIDTH || snake.getCoordY() < 0 ||snake.getCoordY() >= HEIGHT)
        return true;
    return false;
}



/**
 * Cette fonction reset le jeu.
 */
function reset() {
    snake.reset();
    apple.spawnApple(WIDTH, HEIGHT);
    running = true;
    const ending = document.getElementById("ending");
    ending.style.display = "none";
    score = 0;
}



/**
 * Cette fonction mets la pause du jeu.
 */
function pauseButton() {
    if (running)
        pause = !pause;
}



/**
 * Cette fonction relance le jeu lors de la pause.
 */
function unpause() {
    pause = false;
}



function infoGame() {
    const pcInfo = document.getElementById("pc");
    const anotherInfo = document.getElementById("another");

    if (widthScreen > 800) {

        pcInfo.className = "visible";
        anotherInfo.className = "hidden";
        return;
    }
    pcInfo.className = "hidden";
    anotherInfo.className = "visible";
}



setInterval( () => {
    widthScreen = document.getElementById("main").offsetWidth;
    heightScreen = document.getElementById("main").offsetHeight;

    aspect = widthScreen / heightScreen;

    widthSize = widthScreen / WIDTH;
    heightSize = heightScreen / HEIGHT;

    document.getElementById("snakeHead").style.width = `${widthSize}px`;
    document.getElementById("snakeHead").style.height = `${heightSize * aspect}px`;
    snake.widthSize = widthSize;
    snake.heightSize = heightSize;

    document.getElementById("apple").style.width = `${widthSize}px`;
    document.getElementById("apple").style.height = `${heightSize * aspect}px`;
    apple.widthSize = widthSize;
    apple.heightSize = heightSize;

    document.getElementById("score").innerText = `${score}`;

    infoGame();

    /** -------------------------------------------------------------------- **/

    if (running && !pause) {
        const pauseText = document.getElementById("pause");
        pauseText.style.display = "none";
        
        if (collide()) {
            apple.spawnApple(WIDTH, HEIGHT);
            snake.grow();
            score++;
        }

        snake.move();

        if (snake.bit() || isOut()) {
            running = false;
            const ending = document.getElementById("ending");
            ending.style.display = "flex";
        }
        else {
            snake.update();
            apple.update();
        }
    }
    else if (running && pause) {
        const pauseText = document.getElementById("pause");
        pauseText.style.display = "flex";
    }
}, 50);