class MySupplyLand extends CGFobject {


    constructor(scene) {
        super(scene);


        this.down = new MyQuad(scene);
        this.up = new MyQuad(scene);
        this.front = new MyQuad(scene);
        this.back = new MyQuad(scene);
        this.left = new MyQuad(scene);
        this.right = new MyQuad(scene);


        this.initMat();

    }

    initMat() {

        this.up.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ];
        this.up.updateTexCoordsGLBuffers();

        this.down.texCoords = [
            0, 0,
            1, 0,
            0, 1,
            1, 1,

        ];
        this.down.updateTexCoordsGLBuffers();

        this.front.texCoords = [
            1, 1,
            0, 1,
            1, 0,
            0, 0,

        ];
        this.front.updateTexCoordsGLBuffers();

        this.back.texCoords = [
            1, 1,
            0, 1,
            1, 0,
            0, 0,

        ];
        this.back.updateTexCoordsGLBuffers();

        this.right.texCoords = [
            1, 1,
            0, 1,
            1, 0,
            0, 0,

        ];
        this.right.updateTexCoordsGLBuffers();

        this.left.texCoords = [
            1, 1,
            0, 1,
            1, 0,
            0, 0,

        ];
        this.left.updateTexCoordsGLBuffers();


        this.newmat = new CGFappearance(this.scene);
        this.newmat.setAmbient(0.1, 0.1, 0.1, 1);
        this.newmat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.newmat.setSpecular(0.1, 0.1, 0.1, 1);
        this.newmat.setShininess(10.0);
        this.newmat.loadTexture('images/supply.jpg');
        this.newmat.setTextureWrap('REPEAT', 'REPEAT');
    }


    display() {







    }


}
