/**
 * Cette classe représente un serpent.
 */
class Snake {
    /**
     * Cet attribut représente la balise HTML de la tête du serpent.
     */
    #snakeHead;



    /**
     * Cet attribut représente la queue du serpent.
     */
    #snakeParts;



    /**
     * Cet attribut représente la coordonnée X de la tête du serpent.
     */
    #coordX;



    /**
     * Cet attribut représente la coordonnée Y de la tête du serpent.
     */
    #coordY;



    /**
     * Cet attribut représente la vitesse en X du serpent.
     */
    #velocityX;



    /**
     * Cet attribut représente la vitesse en Y du serpent.
     */
    #velocityY;



    /**
     * Le constructeur d'un serpent.
     * 
     * @param {*} widthSize La largeur d'une partie du serpent.
     * @param {*} heightSize La hauteur d'une partie du serpent.
     */
    constructor(widthSize, heightSize) {
        this.#snakeHead = document.getElementById("snakeHead");
        this.#snakeParts = Array();
        this.#coordX = 0;
        this.#coordY = 0;
        this.#velocityX = 1;
        this.#velocityY = 0;

        this.widthSize = widthSize;
        this.heightSize = heightSize;
    }



    /**
     * Cette méthode renvoie la coordonnée X de la tête du serpent.
     * 
     * @return Renvoie la coordonnée X de la tête du serpent.
     */
    getCoordX() {
        return this.#coordX;
    }



    /**
     * Cette méthode renvoie la coordonnée Y de la tête du serpent.
     * 
     * @return Renvoie la coordonnée Y de la tête du serpent.
     */
    getCoordY() {
        return this.#coordY;
    }



    /**
     * Cette méthode ajoute un élément à la queue du serpent.
     */
    grow() {
        const snakePart = document.createElement("div");
        snakePart.style.top = this.#snakeHead.style.top;
        snakePart.style.left = this.#snakeHead.style.left;
        snakePart.style.width = this.#snakeHead.style.width;
        snakePart.style.height = this.#snakeHead.style.height;
        snakePart.className = "snakePart";

        snakePart.id = `${this.#snakeParts.length}`;
        this.#snakeParts.push([this.#coordX, this.#coordY]);

        const snake = document.getElementById("snake");
        snake.appendChild(snakePart);
    }



    /**
     * Cette méthode retire un élément à la queue du serpent.
     */
    #removePart() {
        this.#snakeParts.shift();
        const snakePart = document.getElementById("0");

        const snake = document.getElementById("snake");
        snake.removeChild(snakePart);

        for (let i = 1; i < this.#snakeParts.length + 1; i++) {
            const snakePart = document.getElementById(`${i}`);
            snakePart.id = `${i - 1}`;
        }
    }



    /**
     * Cette méthode fait avancer le serpent.
     */
    move() {
        this.grow();

        this.#coordX += this.#velocityX;
        this.#coordY += this.#velocityY;

        this.#removePart();
    }



    /**
     * Cette méthode fait que le serpent monte.
     */
    goUp() {
        this.#velocityY = -1;
        this.#velocityX = 0;
    }



    /**
     * Cette méthode fait que le serpent descend.
     */
    goDown() {
        this.#velocityY = 1;
        this.#velocityX = 0;
    }



    /**
     * Cette méthode fait que le serpent va à droite.
     */
    goRight() {
        this.#velocityY = 0;
        this.#velocityX = 1;
    }



    /**
     * Cette méthode fait que le serpent va à gauche.
     */
    goLeft() {
        this.#velocityY = 0;
        this.#velocityX = -1;
    }



    /**
     * Cette méthode met à jour la balise HTML de la tête du serpent.
     */
    update() {
        this.#snakeHead.style.left = `${this.#coordX * this.widthSize}px`;
        this.#snakeHead.style.top = `${this.#coordY * this.heightSize}px`;
    }



    /**
     * Cette méthode vérifie si le serpent s'est mordu.
     * 
     * @return Renvoie true si il s'est mordu, false sinon.
     */
    bit() {
        for (let i = 0; i < this.#snakeParts.length; i++) {
            const snakePart = this.#snakeParts[i];
            if (snakePart[0] == this.#coordX && snakePart[1] == this.#coordY)
                return true;
        }
        return false;
    }

}