class MyHelice extends CGFobject {
    constructor(scene) {
        super(scene);
        this.asa = new MySphere(scene,40,50);
        this.asa.initBuffers();
        this.aux=2;

        this.helicestexture = new CGFappearance(this.scene);
        this.helicestexture.setAmbient(0.7,0.7,0.7,1);
        this.helicestexture.setDiffuse(0.9,0.9,0.9,1);
        this.helicestexture.setShininess(10);
        this.helicestexture.loadTexture('images/TexturesVehicle/black.jpg');
        this.helicestexture.setTextureWrap('REPEAT','REPEAT');

        this.motortexture = new CGFappearance(this.scene);
        this.motortexture.setAmbient(0.7,0.7,0.7,1);
        this.motortexture.setDiffuse(0.9,0.9,0.9,1);
        this.motortexture.setShininess(10);
        this.motortexture.loadTexture('images/TexturesVehicle/cinzento.jpg');
        this.motortexture.setTextureWrap('REPEAT','REPEAT');
    }
    helice(speedRotate){
        this.scene.pushMatrix();
        this.helicestexture.apply();
        this.scene.rotate(speedRotate,0,0,1);

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.6,0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.1,0.6,0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.motortexture.apply();
        this.scene.translate(0,0,0);
        this.scene.scale(0.1,0.1,0.1);
        this.asa.display();
        this.scene.popMatrix();


    }
    display(speedRotate){
        this.helice(speedRotate*30);
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.3,0.9);
        this.scene.translate(0,0,1);
        this.asa.display();
        this.scene.popMatrix();
    }
}