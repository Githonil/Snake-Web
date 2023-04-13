var snakeParts = Array();
var coordX = 0;
var coordY = 0;
var velocityX = 0;
var velocityY = 0;

var coordXApple = 0;
var coordYApple = 0;
var respawn = true;

var score = 0;

addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            up();
            break;
        case "ArrowDown":
            down();
            break;
        case "ArrowRight":
            right();
            break;
        case "ArrowLeft":
            left();
            break;
        default:
            break;
    }
});

setInterval(() => {
    const widthScreen = document.getElementById("main").scrollWidth;
    const heightScreen = document.getElementById("main").scrollHeight;
    const aspect = widthScreen / heightScreen;

    const snakeHead = document.getElementById("snakeHead");
    const apple = document.getElementById("apple");
    
    widthPartSize = widthScreen / 50; //Terrain de 50 de large.
    heightPartSize = heightScreen / 50; //Terrain de 50 de haut.

    snakeHead.style.width = `${widthPartSize}px`;
    snakeHead.style.height = `${heightPartSize * aspect}px`;
    apple.style.width = `${widthPartSize}px`;
    apple.style.height = `${heightPartSize * aspect}px`;

    if (respawn) {
        spawnApple(apple, widthPartSize, heightPartSize);
        respawn = false;
    }

    const coordXOut = document.getElementById("coordXOut");
    coordXOut.innerText = `${Math.round((coordX / 50) * 100) / 100}`;

    const scoreHTML = document.getElementById("score");
    scoreHTML.innerText = `${score}`;

    const coordYOut = document.getElementById("coordYOut");
    coordYOut.innerText = `${Math.round((coordY / 50) * 100) / 100}`;

    collide(snakeHead, apple, widthPartSize, heightPartSize, aspect);
    addPart(snakeHead, widthPartSize, heightPartSize, aspect);
    if (snakeParts.length > score) {
        removePart();
        console.log("HERE !");
    }


}, 100);



/**
 * Cette fonction fait spawner une pomme sur le terrain.
 * 
 * @param {*} apple La pomme a faire spawn.
 * @param {*} widthPartSize La taille en largeur de la pomme.
 * @param {*} heightPartSize La taille en hauteur de la pomme.
 */
function spawnApple(apple, widthPartSize, heightPartSize) {
    coordXApple = Math.round((Math.random() * 49));
    coordYApple = Math.round((Math.random() * 49));

    apple.style.left = `${coordXApple * widthPartSize}px`;
    apple.style.top = `${coordYApple * heightPartSize}px`;
}



/**
 * Cette fonction vérifie si la tête du serpent a eu une colision avec la pomme.
 * 
 * @param {*} snakeHead La tête du serpent.
 * @param {*} apple La pomme.
 * @param {*} widthPartSize La largeur des éléments.
 * @param {*} heightPartSize La hauteur des éléments.
 * @param {*} aspect L'aspect de la fenêtre.
 */
function collide(snakeHead, apple, widthPartSize, heightPartSize, aspect) {
    if (coordX == coordXApple && coordY == coordYApple) {
        respawn = true;
        score++;
        addPart(snakeHead, widthPartSize, heightPartSize, aspect);
    }
}




/**
 * Cette fonction ajoute un élément à la queue du serpent.
 * 
 * @param {*} snakeHead La tête du serpent.
 * @param {*} widthPartSize La largeur du serpent.
 * @param {*} heightPartSize La hauteur du serpent.
 * @param {*} aspect L'aspect de l'écran.
 */
function addPart(snakeHead, widthPartSize, heightPartSize, aspect) {
    const snakePart = document.createElement("div");
    snakePart.className = "snakePart";
    snakePart.id = `${snakeParts.length}`;
    snakePart.style.width = `${widthPartSize}px`;
    snakePart.style.height = `${heightPartSize * aspect}px`;
    snakePart.style.top = snakeHead.style.top;
    snakePart.style.left = snakeHead.style.left;
    snakeParts.push(snakePart);

    const snake = document.getElementById("snake");
    snake.appendChild(snakePart);

    coordX += velocityX;
    coordY += velocityY;

    snakeHead.style.left = `${coordX * widthPartSize}px`;
    snakeHead.style.top = `${coordY * heightPartSize}px`;
}



/**
 * Cette fonction supprime un élément à la queue du serpent.
 */
function removePart() {
    const snakePart = document.getElementById(`${snakeParts.length - 1}`);
    const snake = document.getElementById("snake");
    snake.removeChild(snakePart);
    snakeParts.shift();
}



/**
 * Cette fonction fait monté le serpent vers le haut.
 */
function up() {
    velocityY = -1;
    velocityX = 0;
}



/**
 * Cette fonction fait monté le serpent vers le bas.
 */
function down() {
    velocityY = 1;
    velocityX = 0;
}



/**
 * Cette fonction fait monté le serpent vers la droite.
 */
function right() {
    velocityY = 0;
    velocityX = 1;
}



/**
 * Cette fonction fait monté le serpent vers la gauche.
 */
function left() {
    velocityY = 0;
    velocityX = -1;
}