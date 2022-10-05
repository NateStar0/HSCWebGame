
export default class sprite 
{
    constructor(gl, material, url, opts={})
    {
        this.webGL = gl;
        this.isLoaded = false;
        this.material = material;

        this.size = new point(32, 32);

        if("width" in opts) this.size.x = opts.width * 1;
        if("height" in opts) this.size.y = opts.height * 1;

        this.image = new Image();
        this.image.src = url;
        this.image.sprite = this;

        this.image.onload = () => 
        {
            this.setup();
        };
    }

    static createRectangularArray(x = 0, y = 0, w = 1, h = 1)
    {
        return new Float32Array(
            [
                x, y,
                x + w, y,
                x, y + h,
                x, y + h,
                x + w, y,
                x + w, y + h
            ]
        )
    }

    setup()
    {
        this.webGL.useProgram(this.material.program);
		this.gl_tex = this.webGL.createTexture();
		
		this.webGL.bindTexture(this.webGL.TEXTURE_2D, this.gl_tex);
		this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_S, this.webGL.MIRRORED_REPEAT);
		this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_T, this.webGL.MIRRORED_REPEAT);
		this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MAG_FILTER, this.webGL.NEAREST);
		this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MIN_FILTER, this.webGL.NEAREST);
		this.webGL.texImage2D(this.webGL.TEXTURE_2D, 0, this.webGL.RGBA, this.webGL.RGBA, this.webGL.UNSIGNED_BYTE, this.image);
		this.webGL.bindTexture(this.webGL.TEXTURE_2D, null);
		
		this.uv_x = this.size.x / this.image.width;
		this.uv_y = this.size.y / this.image.height;

        console.log(this.image.src, this.uv_x, this.uv_y);
		
		this.tex_buff = this.webGL.createBuffer();
		this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buff);
		this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(0,0,this.uv_x, this.uv_y), this.webGL.STATIC_DRAW);
		
		
		this.geo_buff = this.webGL.createBuffer();
		this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buff);
		this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(0,0,this.size.x, this.size.y), this.webGL.STATIC_DRAW);
		
		this.aPositionLoc = this.webGL.getAttribLocation(this.material.program, "a_position");
		this.aTexcoordLoc = this.webGL.getAttribLocation(this.material.program, "a_texCoord");
		this.uImageLoc = this.webGL.getUniformLocation(this.material.program, "u_image");
		
		this.uFrameLoc = this.webGL.getUniformLocation(this.material.program, "u_frame");
		this.uWorldLoc = this.webGL.getUniformLocation(this.material.program, "u_world");
		this.uObjectLoc = this.webGL.getUniformLocation(this.material.program, "u_object");
		
		this.webGL.useProgram(null);
		this.isLoaded = true;
    }

    render(position, frames)
    {
        if(this.isLoaded)
        {
            let frame_x = Math.floor(frames.x) * this.uv_x;
			let frame_y = Math.floor(frames.y) * this.uv_y;
			
			let oMat = new matrix3x3().transition(position.x, position.y);
			
			this.webGL.useProgram(this.material.program);
			
			this.webGL.activeTexture(this.webGL.TEXTURE0);
			this.webGL.bindTexture(this.webGL.TEXTURE_2D, this.gl_tex);
			this.webGL.uniform1i(this.uImageLoc, 0);
			
			this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buff);
			this.webGL.enableVertexAttribArray(this.aTexcoordLoc);
			this.webGL.vertexAttribPointer(this.aTexcoordLoc,2,this.webGL.FLOAT,false,0,0);
			
			this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buff);
			this.webGL.enableVertexAttribArray(this.aPositionLoc);
			this.webGL.vertexAttribPointer(this.aPositionLoc,2,this.webGL.FLOAT,false,0,0);
			
			this.webGL.uniform2f(this.uFrameLoc, frame_x, frame_y);
			this.webGL.uniformMatrix3fv(this.uWorldLoc, false, window.game.worldSpaceMatrix.getFloatArray());
			this.webGL.uniformMatrix3fv(this.uObjectLoc, false, oMat.getFloatArray());
			
			this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 6);
			
			this.webGL.useProgram(null);
        }
    }
}