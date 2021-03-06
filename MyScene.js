/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();


    //Background color------------------------------------------------
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Set Update Period!----------------------------------------------
    this.setUpdatePeriod(50);

    this.enableTextures(true);

    //Sphere Material-------------------------------------------------
    this.sphere = new MySphere(this, 16, 8);
    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setShininess(10.0);
    this.sphereMaterial.loadTexture("images/earth.jpg");
    this.sphereMaterial.setTextureWrap("Repeat", "Clamp to edge");

    //Cylinder Material-----------------------------------------------
    this.cylinderMaterial = new CGFappearance(this);
    this.cylinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.cylinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.cylinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.cylinderMaterial.setShininess(10.0);
    this.cylinderMaterial.loadTexture("images/cylindText.jpg");
    this.cylinderMaterial.setTextureWrap("Clamp to edge", "Clamp to edge");

    //Initialize scene objects----------------------------------------
    this.axis = new CGFaxis(this);
    this.cubeMap = new MyCubeMap(this);
    this.cylinder = new MyCylinder(this, 20);
    this.vehicle = new MyVehicle(this, 4, 1);
    this.plane = new MyPlane(this, 3, 0, 4, 0, 4);
    this.terrain = new MyTerrain(this);
    this.leme = new MyLeme(this);
    this.billboard = new MyBillboard(this);

    //Supplies--------------------------------------------------------
    this.supply1 = new MySupply(this);
    this.supply2 = new MySupply(this);
    this.supply3 = new MySupply(this);
    this.supply4 = new MySupply(this);
    this.supply5 = new MySupply(this);
    this.content = new Teapot(this);  //for memory and rendering efficiency reasons this is initialized here and not in SupplyLand.js

    this.supplies = [this.supply1, this.supply2, this.supply3, this.supply4, this.supply5];

    this.nSuppliesDelivered = 0;

    //Objects connected to MyInterface--------------------------------
    this.displayAxis = false;
    this.displaySphere = false;
    this.displayMap = true;
    this.displayCylinder = false;
    this.displayVehicle = true;
    this.displayTerrain = true;
    this.displayBillboard = true;
    this.selectedTexture = 0;
    this.speedFactor = 0.1;
    this.scaleFactor = 1;
    this.textureIds = { 'Mountains': 0, 'Desert Mountains': 1 };

    this.lastUpdate = 0;
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(18, 60, 18),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  // called periodically (as per setUpdatePeriod() in init())
  updateMapTexture() {
    this.cubeMap.updateTex();
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.vehicle.autoP == false) {
      if (this.gui.isKeyPressed("KeyW")) {
        text += " W ";
        keysPressed = true;
        if (this.vehicle.vel === 0) {
          this.vehicle.vel = 0.01;
        }
        this.vehicle.accelerate(0.05 * this.speedFactor * this.vehicle.vel);
      }
      if (this.gui.isKeyPressed("KeyS")) {
        text += " S ";
        keysPressed = true;
        this.vehicle.accelerate(-0.05 * this.speedFactor * this.vehicle.vel);
      }
      if (this.gui.isKeyPressed("KeyA")) {
        text += " A ";
        keysPressed = true;
        this.vehicle.turn(10);
      }
      if (this.gui.isKeyPressed("KeyD")) {
        text += " D ";
        keysPressed = true;
        this.vehicle.turn(-10);
      }
      if (this.gui.isKeyPressed("KeyR")) {
        text += " R ";
        keysPressed = true;
        this.vehicle.reset();
        this.supply1.reset();
        this.supply2.reset();
        this.supply3.reset();
        this.supply4.reset();
        this.supply5.reset();
        this.nSuppliesDelivered = 0;
      }
      if (this.gui.isKeyPressed("KeyP")) {
        text += " P ";
        keysPressed = true;
        this.vehicle.autoP = true;
        this.vehicle.vel = 0.1;
        this.autoPAngle = 0;
      }
      if (this.gui.isKeyPressed("KeyC")) {
        text += " C ";
        keysPressed = true;
        if (this.vehicle.vehicleShape.girl == true) {
          this.vehicle.vehicleShape.girl = false;
          this.vehicle.vehicleShape.boy = true;
          this.vehicle.vehicleShape.other = false;
        }
        else if (this.vehicle.vehicleShape.boy == true) {
          this.vehicle.vehicleShape.girl = false;
          this.vehicle.vehicleShape.boy = false;
          this.vehicle.vehicleShape.other = true;
        }
        else if (this.vehicle.vehicleShape.other == true) {
          this.vehicle.vehicleShape.girl = true;
          this.vehicle.vehicleShape.boy = false;
          this.vehicle.vehicleShape.other = false;
        }
        this.vehicle.vehicleShape.initMaterials();
      }
      if (!this.gui.isKeyPressed("KeyA") && !this.gui.isKeyPressed("KeyD"))
        this.vehicle.lemeTurn = 0;

    }
    else {
      if (this.gui.isKeyPressed("KeyP")) {
        text += " P ";
        keysPressed = true;
        this.vehicle.autoP = false;
      }
      if (this.gui.isKeyPressed("KeyR")) {
        text += " R ";
        keysPressed = true;
        this.vehicle.reset();
        this.supply1.reset();
        this.supply2.reset();
        this.supply3.reset();
        this.supply4.reset();
        this.supply5.reset();
        this.nSuppliesDelivered = 0;
      }

    }
    //Supply launch control--------------------------------------------
    if (this.gui.isKeyPressed("KeyL")) {
      text += " L ";
      keysPressed = true;

      if (this.nSuppliesDelivered <= 4)
        this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.y, this.vehicle.z);

      this.nSuppliesDelivered++;

    }

    //Console Log------------------------------------------------------
    if (keysPressed) {
      console.log(text);
    }



  }

  update(t) {
    if (this.lastUpdate === 0)
      this.lastUpdate = t;
    let elapsedTime = t - this.lastUpdate;
    this.lastUpdate = t;

    this.checkKeys();

    this.vehicle.update(elapsedTime);

    this.supply1.update(elapsedTime);
    this.supply2.update(elapsedTime);
    this.supply3.update(elapsedTime);
    this.supply4.update(elapsedTime);
    this.supply5.update(elapsedTime);

    this.billboard.update();
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    if (this.displayCylinder) {
      this.pushMatrix();
      var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
        0.0, this.scaleFactor, 0.0, 0.0,
        0.0, 0.0, this.scaleFactor, 0.0,
        0.0, 0.0, 0.0, 1.0];
      this.multMatrix(sca);
      this.cylinderMaterial.apply();
      this.cylinder.display();
      this.popMatrix();
    }

    if (this.displaySphere) {

      this.pushMatrix();

      if (this.displayTerrain) {
        this.translate(0, 2, 0);  //when terrain is being displayed, it moves up so that it doesnt clip through the terrain
      }
      this.sphereMaterial.apply();
      this.sphere.display();

      this.popMatrix();
    }

    if (this.displayMap) {
      this.pushMatrix();
      this.translate(0, 5, 0);  //to look better when the terrain is displayed
      this.cubeMap.display();
      this.popMatrix();
    }

    if (this.displayVehicle) {
      this.pushMatrix();

      /*var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
        0.0, this.scaleFactor, 0.0, 0.0,
        0.0, 0.0, this.scaleFactor, 0.0,
        0.0, 0.0, 0.0, 1.0];

      this.multMatrix(sca);*/
      this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
      this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
      this.vehicle.display();
      this.popMatrix();
    }

    if (this.displayBillboard)
      this.billboard.display();

    if (this.displayTerrain) {
      this.pushMatrix();
      this.translate(0, -0.1, 0);     //para as supplies não ficarem 'clipped' na textura do terreno
      this.terrain.display();
      this.popMatrix();
    }


    this.supply1.display();
    this.supply2.display();
    this.supply3.display();
    this.supply4.display();
    this.supply5.display();
    // ---- END Primitive drawing section

  }
}
