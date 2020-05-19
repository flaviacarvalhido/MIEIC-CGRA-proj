/**
 * My Triangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2

			-1, 1, 0,	//3 0
			-1, -1, 0,	//4 1
			1, -1, 0	//5 2
		];

		this.indices = [
			0, 1, 2,
			5, 4, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]

		this.texCoords = [
			0, 0,
			0, 0.01,
			0.01, 0.01,

			0.01, 0,
			0.1, 0.01,
			0, 0.01
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}