/*
    Sprite . JS

    By Nathan

    Imports:
        N / A

    Exports:
        sprite (class) - Fundamental sprite asset
*/

import { point } from "../maths.js";

export default class sprite 
{
    constructor(gl, material, url, opts={width : 16, height : 16})
    {
        this.webGL = gl;
        this.isLoaded = false;
        this.material = material;

        this.size = new point(opts.width * 1, opts.height * 1);

        this.scale = new point(1.0, 1.0);

        this.visible = true;

        this.image = new Image();
        this.image.src = url;
        this.image.sprite = this;

        this.image.onload = () => 
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
            
            this.tex_buff = this.webGL.createBuffer();
            this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buff);
            this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(0,0,this.uv_x, this.uv_y), this.webGL.STATIC_DRAW);
            
            
            this.geo_buff = this.webGL.createBuffer();
            this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buff);
            this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(0,0,this.size.x, this.size.y), this.webGL.STATIC_DRAW);
            
            this.webGL.useProgram(null);
            this.isLoaded = true;
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

    render(position, frames)
    {
        if(this.isLoaded && this.visible)
        {
            let frame_x = Math.floor(frames.x) * this.uv_x;
			let frame_y = Math.floor(frames.y) * this.uv_y;
			
			let oMat = new matrix3x3().transition(position.x + (this.size.x * ((this.scale.x < 0) * 1)), position.y + (this.size.y * ((this.scale.y < 0) * 1))).scale(this.scale.x, this.scale.y);
			
			this.webGL.useProgram(this.material.program);
			
			this.webGL.activeTexture(this.webGL.TEXTURE0);
			this.webGL.bindTexture(this.webGL.TEXTURE_2D, this.gl_tex);
			this.material.set("u_image", 0);
			
			this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buff);
			this.material.set("a_texCoord");
			
			this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buff);
			this.material.set("a_position");
			
			this.material.set("u_frame", frame_x, frame_y);
			this.material.set("u_world", window.game.worldSpaceMatrix.getFloatArray());
			this.material.set("u_object", oMat.getFloatArray());
			
			this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 6);
			
			this.webGL.useProgram(null);
        }
    }
}