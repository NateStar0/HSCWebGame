
/*
    RENDERER . JS

    By Nathan Constable
*/

/*
    Imports:
        * material {class/asset} from (/material)
        * sprite {class/asset} from (/sprite)
    Exports:
*/

import material from "./material.js"
import sprite from "./sprite.js"
import shaders from "/shaders.js";

class renderBundle
{
    constructor(spr, pos = new point(0, 0), afr = new point(0, 0))
    {
        this.sprite = spr;
        this.position = pos;
        this.frame = afr;
    }
}

window.renderBundle = renderBundle;

export default class renderer
{
    constructor(gl)
    {
        this.webGL = gl;
        this.vs = shaders.vertex[0];
        this.fs = shaders.fragment[0];
        this.material = new material(this.webGL, this.vs, this.fs);

        this.queue = [];

        
        this.test = new sprite(this.webGL, new material(this.webGL, this.vs, this.fs), "assets/pellets.png", { width : 16, height : 16 });
        this.test_pos = new point(8,0);
        this.test_frame = new point(0, 0);

        this.queue.push(new renderBundle(this.test, this.test_pos, this.test_frame))
        
    }

    update()
    {
        this.queue.sort((a, b) => a.depth - b.depth );

        for(let i = this.queue.length - 1; i >= 0; i--)
        {
            let current = this.queue[i];
            current.sprite.render(current.position, current.frame);
        }
    }
}

