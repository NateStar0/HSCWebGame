
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

export default class renderer
{
    constructor(gl, vShader, fShader)
    {
        this.webGL = gl;
        this.vs = vShader;
        this.fs = fShader;
        this.material = new material(this.webGL, this.vs, this.fs);

        this.queue = [];
    }

    render()
    {
        this.queue.sort((a, b) => a.depth - b.depth );
        
        for(let i = this.queue.length - 1; i >= 0; i-- )
        {
            
        }
    }
}

