/*
    MAIN . JS

    By Nathan Constable (2022 - 2023)
*/

// IMPORTING

import renderer from "./core/renderer/renderer.js";
import logic from "./core/logic.js"
import { point, matrix3x3 } from "./core/maths.js";

// GLOBALISING - (REMOVES IMPORT REQUIREMENTS) :

window.point = point;
window.matrix3x3 = matrix3x3;

// PRIMARY APPLICATION LOOP
const gameLoop = () => 
{
    // FOR CUSTOM FUNCTIONALITY
    window.game.update();

    // FOR webGL FUNCTIONALIY
    requestAnimationFrame(gameLoop);
}

// APPLICATION CLASS

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

        window.webGL = this.webGL;

        document.body.appendChild(this.canvasElement);

        // Create managers
        this.renderer = new renderer(this.webGL);
        this.logic = new logic();
    }

    update ()
    {
        // Shortcut
        let gl = this.webGL;

        // webGL per-frame render preparation
        gl.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Application specific frame functionality
        this.logic.update();
        this.renderer.update();

        // Clear for next frame
        gl.flush();
    }
}

// ENABLE GAME UPON LOAD

window.addEventListener("load", () => 
{ 
    // Create application
    window.game = new game();
    
    // Run application
    gameLoop();
});
