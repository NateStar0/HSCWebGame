/*
    MAIN . JS

    By Nathan Constable (2022)
*/

import renderer from "./core/renderer/renderer.js";
import input from "./core/input/input.js";
import sound from "./core/audio/audio.js";
import sprite from "./core/renderer/sprite.js";
import material from "./core/renderer/material.js";

// Define the fundamental frame loop
function gameLoop() {
    window.game.update();
    requestAnimationFrame(gameLoop);
}

// Define the game manager
class game
{
    constructor ()
    {
        // MISC

        this.renderSize = new point(320, 180);
        this.worldSpaceMatrix = new matrix3x3().transition(-1, 1).scale(2 / this.renderSize.x, -2 / this.renderSize.y);

        // Create Canvas
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = 960;
        this.canvasElement.height = 540;

        // Initialise WebGL
        this.webGL = this.canvasElement.getContext("webgl2", {antialias : false});
        this.webGL.clearColor(0.0, 0.0, 0.0, 1.0);

        // Add render target to site
        document.body.appendChild(this.canvasElement);

        // Get shaders
        this.vs = document.getElementById("vs_01").innerHTML;
        this.fs = document.getElementById("fs_01").innerHTML;

        this.renderer = new renderer(this.webGL, this.vs, this.fs);
        this.input = new input();

        this.test = new sprite(this.webGL, new material(this.webGL, this.vs, this.fs), "assets/pellets.png", {width : 16, height : 16});
        this.test_pos = new point(8,0);
        this.test_frame = new point(0, 0);

        this.test_speed = 1;
    }

    update ()
    {
        this.webGL.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.webGL.clear(this.webGL.COLOR_BUFFER_BIT);

        this.webGL.enable(this.webGL.BLEND);
		this.webGL.blendFunc(this.webGL.SRC_ALPHA, this.webGL.ONE_MINUS_SRC_ALPHA);

        this.test.render(this.test_pos, this.test_frame);
        this.renderer.render();

        this.webGL.flush();
    }
}

// ENABLE GAME UPON LOAD
window.addEventListener("load", () => 
{ 
    window.game = new game(); 
    gameLoop();
});
