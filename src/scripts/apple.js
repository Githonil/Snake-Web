/**
 * Cette classe représente une pomme.
 */
class Apple {
    /**
     * Cet attribut représente la balise HTML de la pomme.
     */
    #apple;



    /**
     * Cet attribut représente la coordonnée en X de la pomme.
     */
    #coordX;



    /**
     * Cet attribut représente la coordonnée en Y de la pomme.
     */
    #coordY;



    /**
     * Le constructeur d'une pomme.
     * 
     * @param widthTerrainSize La largeur du terrain.
     * @param heightTerrainSize La hauteur du terrain.
     * @param {*} widthSize La largeur de la pomme.
     * @param {*} heightSize La hauteur de la pomme.
     */
    constructor(widthTerrainSize, heightTerrainSize, widthSize, heightSize) {
        this.#apple = document.getElementById("apple");
        this.spawnApple(widthTerrainSize, heightTerrainSize);

        this.widthSize = widthSize;
        this.heightSize = heightSize;
    }



    /**
     * Cette méthode renvoie la coordonnée en X de la pomme.
     * 
     * @return Renvoie la coordonnée en X de la pomme.
     */
    getCoordX() {
        return this.#coordX;
    }



    /**
     * Cette méthode renvoie la coordonnée en Y de la pomme.
     * 
     * @return Renvoie la coordonnée en Y de la pomme.
     */
    getCoordY() {
        return this.#coordY;
    }



    /**
     * Cette méthode fait apparaître une pomme sur un terrain de dimension donnée.
     * 
     * @param {*} maxWidth La largeur maximale du terrain.
     * @param {*} maxHeight La hauteur maximale du terrain.
     */
    spawnApple(maxWidth, maxHeight) {
        this.#coordX = Math.round(Math.random() * (maxWidth - 1));
        this.#coordY = Math.round(Math.random() * (maxHeight - 1));
    }



    /**
     * Cette méthode met à jour la balise HTML de la pomme.
     */
    update() {
        this.#apple.style.left = `${this.#coordX * this.widthSize}px`;
        this.#apple.style.top = `${this.#coordY * this.heightSize}px`;
    }

}