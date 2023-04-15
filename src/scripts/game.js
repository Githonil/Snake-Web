const WIDTH = 50;
const HEIGHT = 50;

let widthScreen = document.getElementById("main").scrollWidth;
let heightScreen = document.getElementById("main").scrollHeight;
let aspect = widthScreen / heightScreen;

let widthSize = widthScreen / WIDTH;
let heightSize = heightScreen / HEIGHT;

let score = 0;



let running = true;



let snake = new Snake(widthSize, heightSize);
let apple = new Apple(WIDTH, HEIGHT, widthSize, heightSize);



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
 * Cette méthode vérifie la colision entre la pomme et le serpent.
 * 
 * @return Renvoie true si il y a une colision, false sinon.
 */
function collide() {
    if (snake.getCoordX() == apple.getCoordX() && snake.getCoordY() == apple.getCoordY())
        return true;
    return false;
}



setInterval( () => {
    newWidthScreen = document.getElementById("main").scrollWidth;
    newHeightScreen = document.getElementById("main").scrollHeight;

    if (newWidthScreen != widthScreen || newHeightScreen != heightScreen) {
        apple.spawnApple(WIDTH, HEIGHT);
        snake = new Snake(widthSize, heightSize);
    }

    widthScreen = newWidthScreen;
    heightScreen = newHeightScreen;

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

        if (snake.bit())
            running = false;

        snake.update();
        apple.update();
    }
}, 50);