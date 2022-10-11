
export class point
{
	constructor(x = 0.0, y = 0.0)
    {
		this.x = x;
		this.y = y;
	}
}

export class matrix3x3
{
	constructor()
    {
		this.matrix = 
        [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1 
		];
	}

    index(x, y)
    {
        return (y * 3) + x;
    }

	multiply(m)
    {
		var output = new matrix3x3();

		output.matrix = 
        [
			this.matrix[0] * m.matrix[0] + this.matrix[3] * m.matrix[1] + this.matrix[6] * m.matrix[2],
			this.matrix[1] * m.matrix[0] + this.matrix[4] * m.matrix[1] + this.matrix[7] * m.matrix[2],
			this.matrix[2] * m.matrix[0] + this.matrix[5] * m.matrix[1] + this.matrix[8] * m.matrix[2],
			
			this.matrix[0] * m.matrix[3] + this.matrix[3] * m.matrix[4] + this.matrix[6] * m.matrix[5],
			this.matrix[1] * m.matrix[3] + this.matrix[4] * m.matrix[4] + this.matrix[7] * m.matrix[5],
			this.matrix[2] * m.matrix[3] + this.matrix[5] * m.matrix[4] + this.matrix[8] * m.matrix[5],
			
			this.matrix[0] * m.matrix[6] + this.matrix[3] * m.matrix[7] + this.matrix[6] * m.matrix[8],
			this.matrix[1] * m.matrix[6] + this.matrix[4] * m.matrix[7] + this.matrix[7] * m.matrix[8],
			this.matrix[2] * m.matrix[6] + this.matrix[5] * m.matrix[7] + this.matrix[8] * m.matrix[8]
		];

		return output;
	}

	transition(x, y)
    {
		var output = new matrix3x3();

		output.matrix = 
        [
			this.matrix[0],
			this.matrix[1],
			this.matrix[2],
			
			this.matrix[3],
			this.matrix[4],
			this.matrix[5],
			
			x * this.matrix[0] + y * this.matrix[3] + this.matrix[6],
			x * this.matrix[1] + y * this.matrix[4] + this.matrix[7],
			x * this.matrix[2] + y * this.matrix[5] + this.matrix[8]
		];

		return output;
	}

	scale(x, y)
    {
		var output = new matrix3x3();

		output.matrix = [
			this.matrix[0] * x,
			this.matrix[1] * x,
			this.matrix[2] * x,
			
			this.matrix[3] * y,
			this.matrix[4] * y,
			this.matrix[5] * y,
			
			this.matrix[6],
			this.matrix[7],
			this.matrix[8]
		];

		return output;
	}

	getFloatArray()
    {
		return new Float32Array(this.matrix);
	}
}
