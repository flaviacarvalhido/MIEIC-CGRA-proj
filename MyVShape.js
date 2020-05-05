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

        this.flag=new MyPlane(this.scene,20);
        this.shader=new CGFshader(this.scene.gl, "shaders/bandeira.vert", "shaders/bandeira.frag");
        //this.shader.setUniformsValues({ uSampler1: 1 });
        //this.shader.setUniformsValues({ vehicleSpeed: 0.05 });
        //this.shader.setUniformsValues({time: 0});

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
    lemesDisplay(turn) {
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
        this.helice.display(vel);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(vel);
        this.scene.popMatrix();
    }

    flagUpdate(t){
        this.shader.setUniformsValues({ vehicleSpeed: this.velocity+0.05 });
        this.shader.setUniformsValues({time: t});
    
    }

    display(turn, speed) {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0,-4,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(1.7,0.9,1);
        this.flag.display();
        this.scene.popMatrix();
        //this.scene.setActiveShader(this.reverseShader);
        this.scene.pushMatrix();
        this.scene.translate(0,-4,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(1.7,0.9,1);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.corpoDisplay();
        this.gondolaDisplay();
        this.lemesDisplay(turn);
        this.helicesDisplay(speed);
    }
}