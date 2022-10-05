
export default class material
{
    constructor(gl, vs, fs)
    {
        this.webGL = gl;

        let vShader = this.getShader(vs, gl.VERTEX_SHADER);
        let fShader = this.getShader(fs, gl.FRAGMENT_SHADER);

        if(vShader && fShader)
        {
            this.program = this.webGL.createProgram();
            this.webGL.attachShader(this.program, vShader);
            this.webGL.attachShader(this.program, fShader);
            this.webGL.linkProgram(this.program);

            if(!this.webGL.getProgramParameter(this.program, this.webGL.LINK_STATUS))
            {
                console.error("CANNOT LOAD SHADER \n " + this.webGL.getProgramInfoLog(this.program));
                return null;
            }

            this.webGL.detachShader(this.program, vShader);
            this.webGL.detachShader(this.program, fShader);
            
            this.webGL.deleteShader(vShader);
            this.webGL.deleteShader(fShader);
        }
    }

    getShader(script, form)
    {
        var output = this.webGL.createShader(form);
        this.webGL.shaderSource(output, script)
        this.webGL.compileShader(output);

        // ERROR TEST
        if(!this.webGL.getShaderParameter(output, this.webGL.COMPILE_STATUS))
        {
            console.error("SHADER ERROR: \n" + this.webGL.getShaderInfoLog(output));
            return null;
        }

        return output;
    }
}
