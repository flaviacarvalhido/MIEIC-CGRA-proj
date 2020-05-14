/**
 * MyBillboard
 * @constructor
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 30);

        this.dropped = 0;

        this.shader = new CGFshader(scene.gl,'shaders/gradiente.vert','shaders/gradiente.frag');
        this.shader.setUniformsValues({drops: this.dropped})

        this.initMaterials();
    }
    
    initMaterials(){
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(1, 1, 1, 1);
        this.blue.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blue.setSpecular(0.9, 0.9, 0.9, 1);
        this.blue.setShininess(10.0);
        this.blue.loadTexture('images/TexturesVehicle/darkbluetxt.jpg');
        this.blue.setTextureWrap('REPEAT', 'REPEAT');

        this.gray = new CGFappearance(this.scene);
        this.gray.setAmbient(1, 1, 1, 1);
        this.gray.setDiffuse(0.8, 0.8, 0.8, 1);
        this.gray.setSpecular(0.9, 0.9, 0.9, 1);
        this.gray.setShininess(10.0);
        this.gray.loadTexture('images/TexturesVehicle/cinzento.jpg');
        this.gray.setTextureWrap('REPEAT', 'REPEAT');

        this.textSup = new CGFappearance(this.scene);
        this.textSup.setAmbient(1, 1, 1, 1);
        this.textSup.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textSup.setSpecular(0.9, 0.9, 0.9, 1);
        this.textSup.setShininess(10.0);
        this.textSup.loadTexture('images/billboardtxt.jpg');
        this.textSup.setTextureWrap('REPEAT', 'REPEAT');

    }

    update() {
        this.shader.setUniformsValues({ drops: ++this.dropped});
    }

    reset() {
        this.dropped = 0;
        this.shader.setUniformsValues({ drops: this.dropped });
    }

    boardDisplay(){
        this.textSup.apply();

        this.scene.pushMatrix();
        this.scene.scale(2.0, 1.0, 1.0);
        this.plane.display();
        this.scene.popMatrix();
        this.blue.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 0.0, 1.0, 0.0);
        this.scene.scale(2.0, 1.0, 1.0);
        this.plane.display();
        this.scene.popMatrix();
    }

    legsDisplay(){
        this.gray.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1.0, 0.0);
        this.scene.scale(0.1, 1.0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95, -1.0, 0.0);
        this.scene.scale(0.1, 1.0, 0.0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 0.0, 1.0, 0.0);
        this.scene.translate(-0.95, -1.0, 0.0);
        this.scene.scale(0.1, 1.0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 0.0, 1.0, 0.0);
        this.scene.translate(0.95, -1.0, 0.0);
        this.scene.scale(0.1, 1.0, 0.0);
        this.plane.display();
        this.scene.popMatrix();
    }

	display(){
        this.scene.pushMatrix();
        this.scene.translate(0.0, 2.0, -8.0);
        
        this.boardDisplay();
        this.legsDisplay();
    

        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.25, 0.01);
        this.scene.scale(1.6, 0.3, 1.0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}