/**
 * MyTerrain
 * @constructor
 * @param scene - MyScene object
 */

class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene, 20);

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainVert = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");

        this.terrainShader.setUniformsValues({ terrain: 0 });
        this.terrainShader.setUniformsValues({ heightmap: 1 });

    }



    display() {

        this.scene.setActiveShader(this.terrainShader);
        this.terrainVert.bind(0);
        this.terrainMap.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(50, 8, 50);    //scale terrain correctly
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);   //put plane in right orientation
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);   //reset scene shader
    }


}