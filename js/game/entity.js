

import sprite from "../core/renderer/sprite.js";
import material from "../core/renderer/material.js";
import shaders from "../core/renderer/shaders.js"
import { point } from "../core/maths.js";
import input from "../core/input/input.js";

export default class entity
{
    constructor(x, y, spr)
    {
        this.pos = new point(x, y);
        this.sprite = new sprite(window.webGL, new material(window.webGL, shaders.vertex[0], shaders.fragment[0]), spr, {width : 16, height : 16});
        this.input = new input();
        this.scale = new point(1, 1);
    }

    debool (bool)
    {
        return bool === true ? 1 : 0;
    }

    update()
    {
        this.run();
        this.render();
    }

    run() 
    { 
        
    }

    render()
    {
        window.game.renderer.queue.push(new renderBundle(this.sprite, this.pos, new point(0, 0)));
    }
}
