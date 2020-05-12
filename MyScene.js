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


    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(50);

    this.enableTextures(true);


    this.sphere = new MySphere(this, 16, 8);
    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setShininess(10.0);
    this.sphereMaterial.loadTexture("images/earth.jpg");
    this.sphereMaterial.setTextureWrap("Repeat", "Clamp to edge");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.cubeMap = new MyCubeMap(this);
    this.cylinder = new MyCylinder(this, 20);
    this.vehicle = new MyVehicle(this, 4, 1);
    this.plane = new MyPlane(this, 3, 0, 4, 0, 4);
    this.terrain = new MyTerrain(this);
    this.leme = new MyLeme(this);

    //for testing purposes - delete later
    this.supply = new MySupply(this);
    this.supply.drop(0, 10, 0);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayMap = false;
    this.displayCylinder = false;
    this.displayVehicle = false;
    this.displayPlane = false;
    this.displayTerrain = false;
    this.displaySupply = false;
    this.displayLeme = false;

    this.selectedTexture = 0;
    this.speedFactor = 0.1;
    this.scaleFactor = 1;
    this.textureIds = { 'Mountains': 0, 'Desert Mountains': 1 };

    this.lastUpdate = 0;

    this.setUpdatePeriod(50);
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
      if (keysPressed) {
        console.log(text);
        //this.vehicle.update();
      }
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
      }
      if (keysPressed) {
        console.log(text);
      }
    }
    //this.vehicle.update();
  }

  update(t) {
    if (this.lastUpdate === 0)
      this.lastUpdate = t;
    let elapsedTime = t - this.lastUpdate;
    this.lastUpdate = t;

    this.checkKeys();

    this.vehicle.update(elapsedTime);
    //this.supply.update();

  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    if (this.displayCylinder) {
      this.cylinder.display();
    }

    if (this.displaySphere) {
      this.sphereMaterial.apply();
      this.sphere.display();
    }

    if (this.displayMap) {
      this.pushMatrix();
      this.translate(0, 5, 0);
      this.cubeMap.display();
      this.popMatrix();
    }

    if (this.displayVehicle) {

      this.pushMatrix();

      var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
        0.0, this.scaleFactor, 0.0, 0.0,
        0.0, 0.0, this.scaleFactor, 0.0,
        0.0, 0.0, 0.0, 1.0];

      this.multMatrix(sca);
      this.vehicle.display();
      this.popMatrix();
    }

    if (this.displayPlane)
      this.plane.display();

    if (this.displayLeme)
      this.leme.display();

    if (this.displayTerrain) {
      this.pushMatrix();
      this.translate(0, 0, 0);
      this.terrain.display();
      this.popMatrix();
    }

    if (this.displaySupply) {
      this.pushMatrix();
      var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
        0.0, this.scaleFactor, 0.0, 0.0,
        0.0, 0.0, this.scaleFactor, 0.0,
        0.0, 0.0, 0.0, 1.0];
      this.multMatrix(sca);
      this.supply.display();
      this.popMatrix();

    }

    // ---- END Primitive drawing section

  }
}
