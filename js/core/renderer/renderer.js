
/*
    RENDERER . JS

    By Nathan Constable

    Imports:
        N / A
    Exports:
        renderer (class) - Contains the basic renderer functionality (sorts by depth, then draws correctly)
*/

class renderBundle
{
    constructor(spr, pos = new point(0, 0), afr = new point(0, 0))
    {
        this.depth = 0;
        this.sprite = spr;
        this.position = pos;
        this.frame = afr;
    }
}

window.renderBundle = renderBundle;

export default class renderer
{
    constructor()
    {
        this.queue = [];
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

