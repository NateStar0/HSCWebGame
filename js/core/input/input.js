
export default class input
{
    constructor()
    {
        this.keys = [];
        this.map = {};

        window.addEventListener("keydown", (e) =>
        {
            this.keys[e.keyCode] = true;
            this.generateMap();
        }, false);

        window.addEventListener('keyup', (e) =>
        {
            this.keys[e.keyCode] = false;
            this.generateMap();
        }, false);

        window.addEventListener("gamepadconnected", (e) => 
        {
            console.warn("Gamepad connected at index %d: %s. %d buttons, %d axes.",
              e.gamepad.index, e.gamepad.id,
              e.gamepad.buttons.length, e.gamepad.axes.length);
        });
    }

    generateMap()
    {
        for(let i = 0; i < this.keys.length; i++)
        {
            this.map[String.fromCharCode(i)] = (this.keys[i] == undefined) ? false : this.keys[i];
        }
    }

    get()
    {
        return this.map;
    }
}
