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
        this.y = 10;
        this.z = 0;

        this.lemeTurn = 0;
        this.vehicleShape=new MyVShape(this.scene)

        this.autoP = false;
        this.autoPAngle = 0;

        //BANDEIRA:
        this.bandeiratxt = new CGFappearance(this.scene);
        this.bandeiratxt.setAmbient(0.7, 0.7, 0.7, 1);
        this.bandeiratxt.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bandeiratxt.setShininess(10);
        this.bandeiratxt.loadTexture('images/testMap.jpg');
        this.bandeiratxt.setTextureWrap('REPEAT', 'REPEAT');

        this.bandeira = new MyPlane(this.scene, 20);

        this.shader1 = new CGFshader(this.scene.gl, "shaders/bandeiraR.vert", "shaders/bandeira.frag");
        this.shader1.setUniformsValues({ uSampler1: 3 })
        this.shader1.setUniformsValues({ speed: this.speed });
        this.shader1.setUniformsValues({ timeFactor: this.prevUpdate });

        this.shader2 = new CGFshader(this.scene.gl, "shaders/bandeiraL.vert", "shaders/bandeira.frag");
        this.shader2.setUniformsValues({ uSampler1: 3 })
        this.shader2.setUniformsValues({ speed: this.speed });
        this.shader2.setUniformsValues({ timeFactor: this.prevUpdate });

        this.bandeiramap = new CGFtexture(this.scene, "images/testMap.jpg");

        //FIO:
        this.fio = new MyCylinder(scene,10);
        this.fiotxt = new CGFappearance(this.scene);
        this.fiotxt.setAmbient(0.7, 0.7, 0.7, 1);
        this.fiotxt.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fiotxt.setShininess(10);
        this.fiotxt.loadTexture('images/TexturesVehicle/cinzento.jpg');
        this.fiotxt.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    bandeiraDisplay() {
        this.bandeiratxt.apply();
        this.scene.setActiveShader(this.shader1);
        this.bandeiramap.bind(3);
        this.scene.pushMatrix();
        this.scene.translate(0, -4, 0);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1.7, 0.9, 1);
        this.bandeira.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.shader2);
        this.bandeiramap.bind(3);
        this.scene.pushMatrix();
        this.scene.translate(0, -4, 0);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.scene.scale(1.7, 0.9, 1);
        this.bandeira.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    fiosDisplay(){
        this.scene.pushMatrix();
        this.fiotxt.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,-3.2,0.25);
        this.scene.scale(0.025,1.7,0.025);
        this.fio.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-3.2,-0.25);
        this.scene.scale(0.025,1.7,0.025);
        this.fio.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


    turn(val) {
        this.angY += val;
        if (val > 0) {
            this.lemeTurn = Math.PI / 4;
        }
        else {
            this.lemeTurn = Math.PI / 2 + Math.PI / 4;
        }
    }
    accelerate(val) {
        this.vel += val;
        this.lemeTurn = 0;
    }

    reset() {
        this.angY = 0;
        this.vel = 0;
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.autoP = false;
        this.autoPAngle = 0;
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

        this.scene.pushMatrix();
        this.fiosDisplay();
        this.scene.popMatrix();
        this.bandeiraDisplay();
        this.vehicleShape.display(this.lemeTurn, this.vel);

        super.display();
        this.scene.popMatrix();
    }

    update(elapsedTime) {
        //var text = "updating ";
        //console.log(text);
            if (this.autoP) {
                this.autoPAngle += 2 * Math.PI * elapsedTime / 5000.0;
                //var text2 = "in autoP ";
                //console.log(text2);
            }
            else {
                this.z += 0.1 * elapsedTime * this.vel * Math.cos(this.angY * Math.PI / 180.0);
                this.x += 0.1 * elapsedTime * this.vel * Math.sin(this.angY * Math.PI / 180.0);
            }
    
            this.shader1.setUniformsValues({ speed: this.speed });
            this.shader1.setUniformsValues({ timeFactor: elapsedTime / 1000 % 1000 });
            this.shader2.setUniformsValues({ speed: this.speed });
            this.shader2.setUniformsValues({ timeFactor: elapsedTime / 1000 % 1000 });

    }

}

