

/*State machine for supply drop */
const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MyObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {


    constructor(scene) {
        super(scene);


        this.fall = new MySupplyFall(scene);
        this.landed = new MySupplyLand(scene);

        this.x = 0;
        this.y = 10;
        this.z = 0;

        this.vel = this.y/3;

        this.state = SupplyStates.INACTIVE;

    }

    update(t) {

        if (this.state == SupplyStates.FALLING) {
            this.y-=this.vel*t/1000;
            //this.y = this.y - 10 / 60;
        }

    }

    drop(x, y, z) {

        if (x >= -10 && x <= 10 && z >= -10 && z <= 10) {
            this.state = SupplyStates.FALLING;
            this.x = x;
            this.y = y;
            this.z = z;
        }

    }

    land() {

        if (this.y <= 0) {
            this.state = SupplyStates.LANDED;
        }

    }

    display() {

        if (this.state == SupplyStates.FALLING) {  //draw supply when dropping

            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);     //new position in every updatePeriod
            this.fall.display();
            this.scene.popMatrix();

            this.land();
        }

        if (this.state == SupplyStates.LANDED) { //draw supply when landed

            this.scene.pushMatrix();
            this.scene.translate(this.x, 0, this.z);
            this.landed.display();
            this.scene.popMatrix();

        }


    }

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.display();
    }

}
