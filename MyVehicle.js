/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.angY = 0;
        this.vel = 0;
        //posicao:
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.lemeTurn=0;
        this.vehicleShape=new MyVShape(this.scene);

        this.autoP=false;
        this.autoPAngle=0;

        //BANDEIRA:
        this.flagtexture = new CGFappearance(this.scene);
        this.flagtexture.setAmbient(0.7,0.7,0.7,1);
        this.flagtexture.setDiffuse(0.9,0.9,0.9,1);
        this.flagtexture.setShininess(10);
        this.flagtexture.loadTexture('images/testMap.jpg');
        this.flagtexture.setTextureWrap('REPEAT', 'REPEAT');

        this.bandeira=new MyPlane(this.scene,20);
        this.flagshaderR = new CGFshader(this.scene.gl,"shaders/bandeiraR.vert", "shaders/bandeira.frag");
        this.flagshaderR.setUniformsValues({uSampler1: 3})
        this.flagshaderR.setUniformsValues({speed: this.speed});
        this.flagshaderR.setUniformsValues({timeFactor: this.prevUpdate});

        this.flagshaderL = new CGFshader(this.scene.gl,"shaders/bandeiraL.vert", "shaders/bandeira.frag");
        this.flagshaderL.setUniformsValues({uSampler1: 3})
        this.flagshaderL.setUniformsValues({speed: this.speed});
        this.flagshaderL.setUniformsValues({timeFactor: this.prevUpdate});

        this.flagmap = new CGFtexture(this.scene,"images/testMap.jpg");

        this.initBuffers();
    }

    bandeiraDisplay(){
        this.flagtexture.apply();
        this.scene.setActiveShader(this.flagshaderR);
        this.flagmap.bind(3);
        this.scene.pushMatrix();
        this.scene.translate(0,-4,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(1.7,0.9,1);
        this.bandeira.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.flagshaderL);
        this.flagmap.bind(3);
        this.scene.pushMatrix();
        this.scene.translate(0,-4,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(1.7,0.9,1);
        this.bandeira.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }


    turn(val) {
        this.angY += val;
        if(val>0){
            this.lemeTurn=Math.PI/4;
        } 
        else {
            this.lemeTurn=Math.PI/2+Math.PI/4;
        }
    }
    accelerate(val) {
        this.vel += val;
        this.lemeTurn=0;
    }

    reset() {
        this.angY = 0;
        this.vel = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.autoP=false;
        this.autoPAngle=0;
    }

    display() {
        this.scene.pushMatrix();

        if (this.autoP) {
            this.scene.translate(-5 * Math.cos(-this.angY * Math.PI / 180.0), 0, -5 * Math.sin(-this.angY * Math.PI / 180.0));
            this.scene.rotate(-this.autoPAngle, 0, 1, 0);
            this.scene.translate(5 * Math.cos(-this.angY * Math.PI / 180.0), 0, 5 * Math.sin(-this.angY * Math.PI / 180.0));
        }

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angY * Math.PI / 180, 0, 1, 0);

        this.scene.translate(0, 0, -0.5); //pos inicial
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);

        this.bandeiraDisplay();
        this.vehicleShape.display(this.lemeTurn,this.vel);

        super.display();
        this.scene.popMatrix();
    }

    update(elapsedTime) {
        //var text = "updating ";
        //console.log(text);
        
        if (this.autoP) {
            this.autoPAngle += 2*Math.PI*elapsedTime/5000.0;
            //var text2 = "in autoP ";
            //console.log(text2);
        }
        else {
            this.z += 0.1 * elapsedTime * this.vel * Math.cos(this.angY*Math.PI/180.0);
            this.x += 0.1 * elapsedTime * this.vel * Math.sin(this.angY*Math.PI/180.0);
        }

        this.flagshaderR.setUniformsValues({speed: this.speed});
        this.flagshaderR.setUniformsValues({timeFactor: elapsedTime / 1000 % 1000});
        this.flagshaderL.setUniformsValues({speed: this.speed});
        this.flagshaderL.setUniformsValues({timeFactor: elapsedTime / 1000 % 1000});
    }

}

