class MySupplyLand extends CGFobject {


    constructor(scene) {
        super(scene);


        this.down = new MyQuad(scene);
        this.up = new MyQuad(scene);
        this.front = new MyQuad(scene);
        this.back = new MyQuad(scene);
        this.left = new MyQuad(scene);
        this.right = new MyQuad(scene);
        this.content = new Teapot(scene);


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


        //content (teapot) appearance & shader
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);

        this.contentShader = new CGFshader(this.scene.gl, "shaders/flat.vert", "shaders/flat.frag");
    }


    display() {


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.down.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.up.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.left.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.right.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.back.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.newmat.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.front.display();
        this.scene.popMatrix();


        //content
        this.appearance.apply();
       // this.scene.setActiveShader(this.contentShader);
        this.scene.pushMatrix();
        this.scene.scale(0.03, 0.03, 0.03);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.content.display();
        this.scene.popMatrix();
       // this.scene.setActiveShader(this.scene.defaultShader);
    }


}
