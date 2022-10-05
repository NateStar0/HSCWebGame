
import entity from "./entity.js"

export default class example extends entity
{
    constructor(x, y, sprite)
    {
        super(x, y, sprite); // Pass all inhereted functions


    }

    run()
    {
        /*
                console.log(this.input.get());

        if(this.input.get()["A"])
        {
            this.test_pos.x = 128;
        }
        */
    }
}
