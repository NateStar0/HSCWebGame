/*
    Audio . JS

    By Nathan

    Imports:
        N / A

    Exports:
        sound (class) - basic wrapper for HTML5 sound system
*/

export default class sound
{
    constructor(filename, canLoop)
    {
        this.audioElement = new Audio(filename);
        this.canLoop = canLoop;

        if(canLoop)
        {
            if(typeof this.audioElement.loop == "boolean")
            {
                this.audioElement.loop = true;
            }
            else
            {
                this.audioElement.addEventListener("ended", () =>
                {
                    this.currentTime = 0;
                    this.play();
                })
            }
        }
    }

    play()
    {
        this.audioElement.currentTime = 0;
        this.audioElement.play();
    }

    stop()
    {
        this.audioElement.pause();
    }
}
