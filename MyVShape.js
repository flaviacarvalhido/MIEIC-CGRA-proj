class MyVShape extends CGFobject {
    constructor(scene) {
        super(scene);
        this.time = 0;

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

        this.boy=false;
        this.girl=true;
        this.other=false;

        this.initMaterials();
    }
    initMaterials(){
        this.bodytexture = new CGFappearance(this.scene);
        this.bodytexture.setAmbient(0.7,0.7,0.7,1);
        this.bodytexture.setDiffuse(0.9,0.9,0.9,1);
        this.bodytexture.setShininess(10);
        if(this.girl){
            console.log("girl");
            this.bodytexture.loadTexture('images/TexturesVehicle/pinkhearts.jpg');
        }
        else if(this.boy){
            console.log("boy");
            this.bodytexture.loadTexture('images/TexturesVehicle/bluestripes.png')
        }
        else if(this.other){
            console.log("other");
            this.bodytexture.loadTexture('images/TexturesVehicle/graywood.jpg')
        }
        this.bodytexture.setTextureWrap('REPEAT','REPEAT');
//_______________________________________________________________________________
        this.lemestexture = new CGFappearance(this.scene);
        this.lemestexture.setAmbient(0.7,0.7,0.7,1);
        this.lemestexture.setDiffuse(0.9,0.9,0.9,1);
        this.lemestexture.setShininess(10);
        if(this.girl){
            console.log("girl");
            this.lemestexture.loadTexture('images/TexturesVehicle/pink.jpg');
        }
        else if(this.boy){
            console.log("boy");
            this.lemestexture.loadTexture('images/TexturesVehicle/Bletter.png')
        }
        else if(this.other){
            console.log("other");
            this.lemestexture.loadTexture('images/TexturesVehicle/greenstripes.jpg')
        }
        this.lemestexture.setTextureWrap('REPEAT','REPEAT');
//__________________________________________________________________________________________
        this.gondolatexture = new CGFappearance(this.scene);
        this.gondolatexture.setAmbient(0.7,0.7,0.7,1);
        this.gondolatexture.setDiffuse(0.9,0.9,0.9,1);
        this.gondolatexture.setShininess(10);
        if(this.girl){
            console.log("girl");
            this.gondolatexture.loadTexture('images/TexturesVehicle/pink.jpg');
        }
        else if(this.boy){
            console.log("boy");
            this.gondolatexture.loadTexture('images/TexturesVehicle/darkbluetxt.jpg')
        }
        else if(this.other){
            console.log("other");
            this.gondolatexture.loadTexture('images/TexturesVehicle/greenstripes.jpg')
        }
        this.gondolatexture.setTextureWrap('REPEAT','REPEAT');
    }


    corpoDisplay(){
        this.scene.pushMatrix();
        this.bodytexture.apply();
        this.scene.scale(1, 2, 1);
        this.corpo.display();
        this.scene.popMatrix();
    }
    gondolaDisplay() {
        this.gondolatexture.apply();

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
    lemesDisplay(turn) {
        this.lemestexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.lemeE.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.lemeD.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, -0.85);
        this.scene.rotate(turn,0,1,0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.lemeC.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, 0.9);
        this.scene.rotate(turn,0,1,0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.lemeB.display();
        this.scene.popMatrix();
    }
    helicesDisplay(vel){
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(vel*40);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(vel*40);
        this.scene.popMatrix();
    }
    
    display(turn, speed) {
        this.corpoDisplay();
        this.gondolaDisplay();
        this.lemesDisplay(turn);
        this.helicesDisplay(speed);
    }
}