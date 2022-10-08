

export default class material
{
    constructor(gl, vs, fs)
    {
        this.webGL = gl;

        let vShader = this.getShader(vs, this.webGL.VERTEX_SHADER);
        let fShader = this.getShader(fs, this.webGL.FRAGMENT_SHADER);

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

            this.getParams();

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

    getParams()
    {
        this.params = {};

        for(let isUniform = 0; isUniform <= 1; isUniform++)
        {
            let paramType = isUniform ? this.webGL.ACTIVE_UNIFORMS : this.webGL.ACTIVE_ATTRIBUTES;
            let count = this.webGL.getProgramParameter(this.program, paramType);

            for(let i = 0; i < count; i++)
            {
                let details = (isUniform) ? this.webGL.getActiveUniform(this.program, i) : this.webGL.getActiveAttrib(this.program, i);
                let location = (isUniform) ? this.webGL.getUniformLocation(this.program, details.name) : this.webGL.getAttribLocation(this.program, details.name);
				
				this.params[details.name] = {
					location : location,
					uniform : !!isUniform,
					type : details.type
				}
            }
        }
    }

    set(name, a = this.webGL.FLOAT, b = false, c = 0, d = 0)
    {
		if(name in this.params)
        {
			let param = this.params[name];
            
			if(param.uniform)
            {
				switch(param.type)
                {
					case this.webGL.FLOAT: this.webGL.uniform1f(param.location, a); break;
					case this.webGL.FLOAT_VEC2: this.webGL.uniform2f(param.location, a, b); break;
					case this.webGL.FLOAT_VEC3: this.webGL.uniform3f(param.location, a, b, c); break;
					case this.webGL.FLOAT_VEC4: this.webGL.uniform4f(param.location, a, b, c, d); break;
					case this.webGL.FLOAT_MAT3: this.webGL.uniformMatrix3fv(param.location, false, a); break;
					case this.webGL.FLOAT_MAT4: this.webGL.uniformMatrix4fv(param.location, false, a); break;
					case this.webGL.SAMPLER_2D: this.webGL.uniform1i(param.location, a); break;
				}
			} 
            else 
            {
				this.webGL.enableVertexAttribArray(param.location);
				
				switch(param.type)
                {
					case this.webGL.FLOAT : this.webGL.vertexAttribPointer(param.location, 1, a, b, c, d); break;
					case this.webGL.FLOAT_VEC2 : this.webGL.vertexAttribPointer(param.location, 2, a, b, c, d); break;
					case this.webGL.FLOAT_VEC3 : this.webGL.vertexAttribPointer(param.location, 3, a, b, c, d); break;
					case this.webGL.FLOAT_VEC4 : this.webGL.vertexAttribPointer(param.location, 4, a, b, c, d); break;
				}
			}
		}
        else
        {
            console.warn("ATTEMPTING TO SET PROPERTY WHICH IS UNUSED IN SHADER: " + name);
        }
	}
}
