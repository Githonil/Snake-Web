const WIDTH = 50;
const HEIGHT = 50;

let widthScreen = document.getElementById("main").scrollWidth;
let heightScreen = document.getElementById("main").scrollHeight;
let aspect = widthScreen / heightScreen;

let widthSize = widthScreen / WIDTH;
let heightSize = heightScreen / HEIGHT;

let score = 0;



let running = true;



const snake = new Snake(widthSize, heightSize);
const apple = new Apple(WIDTH, HEIGHT, widthSize, heightSize);



addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            snake.goUp();
            break;
        case "ArrowDown":
            snake.goDown();
            break;
        case "ArrowRight":
            snake.goRight();
            break;
        case "ArrowLeft":
            snake.goLeft();
            break;
        default:
            break;
    }
})



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
 * @param Renvoie true si le serpent est en dehors du terrain, false sinon.
 */
function isOut() {
    if (snake.getCoordX() < 0 || snake.getCoordX() >= WIDTH || snake.getCoordY() < 0 ||snake.getCoordY() >= HEIGHT)
        return true;
    return false;
}



setInterval( () => {
    widthScreen = document.getElementById("main").scrollWidth;
    heightScreen = document.getElementById("main").scrollHeight;

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

    /** -------------------------------------------------------------------- **/

    if (running) {
        if (collide()) {
            apple.spawnApple(WIDTH, HEIGHT);
            snake.grow();
            score++;
        }

        snake.move();

        if (snake.bit() || isOut())
            running = false;

        snake.update();
        apple.update();
    }
}, 50);