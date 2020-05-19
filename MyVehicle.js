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
        this.vehicleShape = new MyVShape(this.scene)

        this.autoP = false;
        this.autoPAngle = 0;

        //BANDEIRA:
        this.bandeira = new MyFlag(this.scene);

        //FIO:
        this.fio = new MyCylinder(scene, 10);
        this.fiotxt = new CGFappearance(this.scene);
        this.fiotxt.setAmbient(0.7, 0.7, 0.7, 1);
        this.fiotxt.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fiotxt.setShininess(10);
        this.fiotxt.loadTexture('images/TexturesVehicle/cinzento.jpg');
        this.fiotxt.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }


    fiosDisplay() {
        this.scene.pushMatrix();
        this.fiotxt.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -3.2, 0.25);
        this.scene.scale(0.025, 1.7, 0.025);
        this.fio.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -3.2, -0.25);
        this.scene.scale(0.025, 1.7, 0.025);
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

        this.bandeira.display();

        this.scene.pushMatrix();
        this.fiosDisplay();
        this.scene.popMatrix();

        this.vehicleShape.display(this.lemeTurn, this.vel);

        super.display();
        this.scene.popMatrix();
    }

    update(time) {

        if (this.autoP) {
            this.autoPAngle += 2 * Math.PI * time / 5000.0;

        }
        else {
            this.z += 0.1 * time * this.vel * Math.cos(this.angY * Math.PI / 180.0);
            this.x += 0.1 * time * this.vel * Math.sin(this.angY * Math.PI / 180.0);
        }

        this.bandeira.update(time, this.vel);

    }

}

