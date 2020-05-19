/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	
	constructor(scene,coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}

	initBuffers() {  //passar info para o WEBGL
		this.vertices = [
			-1, 0, 0,	//0 ponto A
			0, -1, 0,	//1 ponto B
			0, 1, 0,	//2 Ponto C
			1, 0, 0,	//3 ponto D

			-1,0,0, //4 
			0,-1,0, //5
			0,1,0, //6
			1,0,0 //7
		];
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,  //ABC
			1, 3, 2,	  //DCB

			6,7,5, //CBA
			5,4,6 //CDB
		];
		this.normals=[
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		];
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
		this.texCoords = [
			0,1,
			1,1,
			0,0,
			1,0,
			
			1,0,
			0,0,
			1,1,
			0,1
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}