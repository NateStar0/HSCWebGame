
import { point } from "../core/maths.js";
import entity from "./entity.js"

export default class player extends entity
{
    constructor(x, y, sprite)
    {
        super(x, y, sprite); // Pass all inhereted functions

        this.speed = new point();
        this.magnitude = 2;
    }

    run()
    {
        let horizontalInput = this.debool(this.input.get()["D"]) - this.debool(this.input.get()["A"]);
        let verticalInput = this.debool(this.input.get()["S"]) - this.debool(this.input.get()["W"]);

        this.speed.x = this.magnitude * horizontalInput;
        this.speed.y = this.magnitude * verticalInput;

        this.sprite.scale.x = (this.speed.x != 0) ? Math.sign(this.speed.x) : this.sprite.scale.x; // Why use abs(speed.x) instead for horizontalInput ? (Accounts for accelerative motion later!)

        console.log(this.sprite.scale, this.pos)

        // Collision here (x)
        this.pos.x += this.speed.x;

        // Collision here (y)
        this.pos.y += this.speed.y;
    }
}
