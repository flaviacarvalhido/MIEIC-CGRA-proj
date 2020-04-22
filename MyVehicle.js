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

        this.initBuffers();
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
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angY * Math.PI / 180, 0, 1, 0);

        this.scene.translate(0, 0, -0.5); //pos inicial
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);

        this.vehicleShape.display(this.lemeTurn,this.vel);
        super.display();
        this.scene.popMatrix();
    }

    update() {
        this.x += this.vel * Math.sin(this.angY * Math.PI / 180);
        this.z += this.vel * Math.cos(this.angY * Math.PI / 180);
    }
}

