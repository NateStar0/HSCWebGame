
import material from "./core/renderer/material.js"
import sprite from "./core/renderer/sprite.js"

const gameLoop = () =>
{
    window.game.update();
    requestAnimationFrame(gameLoop);
}

class Game
{
    constructor ()
    {
        // Create Canvas
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = 960;
        this.canvasElement.height = 540;

        // Initialise WebGL
        this.webGL = this.canvasElement.getContext("webgl2", {antialias : false});

        this.webGL.clearColor(0.5, 0.5, 0.5, 1.0);

        // Add render target to site
        document.body.appendChild(this.canvasElement);

        // Get shaders
        this.vs = document.getElementById("vs_01").innerHTML;
        this.fs = document.getElementById("fs_01").innerHTML;

        this.material = new material(this.webGL, this.vs, this.fs);
        this.pellets = new sprite(this.webGL, "assets/pellets.png", this.material);

    }

    update ()
    {
        this.webGL.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.webGL.clear(this.webGL.COLOR_BUFFER_BIT);

        this.webGL.enable(this.webGL.BLEND);
		this.webGL.blendFunc(this.webGL.SRC_ALPHA, this.webGL.ONE_MINUS_SRC_ALPHA);

        this.pellets.render();

        this.webGL.flush();
    }
}

window.addEventListener("load", () => 
{ 
    window.game = new Game(); 
    gameLoop();
});
