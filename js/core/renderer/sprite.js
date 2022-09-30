
export default class sprite 
{
    constructor(gl, url, material)
    {
        this.webGL = gl;
        this.isLoaded = false;
        this.material = material;

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
        console.log("BEGINNING GL SETUP!")
        this.webGL.useProgram(this.material.program);
        this.webGL_texture = this.webGL.createTexture();

        this.webGL.bindTexture(this.webGL.TEXTURE_2D, this.webGL_texture);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_S, this.webGL.MIRRORED_REPEAT);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_T, this.webGL.MIRRORED_REPEAT);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MAG_FILTER, this.webGL.LINEAR);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MIN_FILTER, this.webGL.LINEAR);
        this.webGL.texImage2D(this.webGL.TEXTURE_2D, 0, this.webGL.RGBA, this.webGL.RGBA, this.webGL.UNSIGNED_BYTE, this.image);
        this.webGL.bindTexture(this.webGL.TEXTURE_2D, null);

        this.tex_buffer = this.webGL.createBuffer();
        this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buffer);
        this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(), this.webGL.STATIC_DRAW);

        this.geo_buffer = this.webGL.createBuffer();
        this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buffer);
        this.webGL.bufferData(this.webGL.ARRAY_BUFFER, sprite.createRectangularArray(), this.webGL.STATIC_DRAW);

        this.aPositionLoc = this.webGL.getAttribLocation(this.material.program, "a_position");
        this.aTexcoordLoc = this.webGL.getAttribLocation(this.material.program, "a_texCoord");
        this.uImageLoc = this.webGL.getUniformLocation(this.material.program, "u_image");

        this.webGL.useProgram(null);
        this.isLoaded = true;
    }

    render()
    {
        if(this.isLoaded)
        {
            this.webGL.useProgram(this.material.program);

            this.webGL.activeTexture(this.webGL.TEXTURE0);
            this.webGL.bindTexture(this.webGL.TEXTURE_2D, this.webGL_texture);
            this.webGL.uniform1i(this.uImageLoc, 0);

            this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.tex_buffer);
            this.webGL.enableVertexAttribArray(this.aTexcoordLoc);
            this.webGL.vertexAttribPointer(this.aTexcoordLoc, 2, this.webGL.FLOAT, false, 0, 0);

            this.webGL.bindBuffer(this.webGL.ARRAY_BUFFER, this.geo_buffer);
            this.webGL.enableVertexAttribArray(this.aPositionLoc);
            this.webGL.vertexAttribPointer(this.aPositionLoc, 2, this.webGL.FLOAT, false, 0, 0);

            this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 6)

            this.webGL.useProgram(null);

            console.log("Test 4!")
        }
    }
}