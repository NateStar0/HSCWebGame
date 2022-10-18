/*
    Logic . JS

    By Nathan

    Imports:
        All game assets

    Exports:
        logic (class) - A basic runner for all game objects
*/

import player from "../game/player.js"

export default class logic
{
    constructor()
    {
        window.instances = []; // Global scoping

        instances.push(new player(16, 16, "assets/pellets.png"));
    }

    update ()
    {
        window.instances.forEach((inst) => inst.update());
    }
}
