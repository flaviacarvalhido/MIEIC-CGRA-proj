class MyVShape extends CGFobject {
    constructor(scene) {
        super(scene);
        this.corpo=new MySphere(scene,20,30);
        this.gondola=new MySphere(scene,20,30);
        this.gondolamidle=new MyCylinder(scene,20,1);
        this.helice= new MyHelice(scene);
        this.lemeE=new MyLeme(scene);
        this.lemeD=new MyLeme(scene);
        this.lemeB= new MyLeme(scene);
        this.lemeC= new MyLeme(scene);

        this.corpo.initBuffers();
        this.gondola.initBuffers();
        this.gondolamidle.initBuffers();
    }

    corpoDisplay(){
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.corpo.display();
        this.scene.popMatrix();
    }
    gondolaDisplay() {
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1.2);
        this.scene.scale(0.3, 0.7, 0.30);
        this.gondolamidle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.42, 1.2);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1.2);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola.display();
        this.scene.popMatrix();
    }
    lemesDisplay(angulo) {
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.65);
        this.lemeE.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.65);
        this.lemeD.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, -0.85);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.65);
        this.lemeC.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, 0.9);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.65);
        this.lemeB.display();
        this.scene.popMatrix();
    }
    helicesDisplay(vel){
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(vel);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(vel);
        this.scene.popMatrix();

    }
    display(angulo, speed) {
        this.corpoDisplay();
        this.gondolaDisplay();
        this.lemesDisplay(angulo);
        this.helicesDisplay(speed);

    }
}