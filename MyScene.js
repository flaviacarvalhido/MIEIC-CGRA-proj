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

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.sphere = new MySphere(this, 16, 8);
    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.sphereMaterial.setShininess(10.0);
    this.sphereMaterial.loadTexture("images/earth.jpg");
    this.sphereMaterial.setTextureWrap("Repeat", "Clamp to edge");

    this.cubeMap = new MyCubeMap(this);


    this.cylinder = new MyCylinder(this, 20);

    this.vehicle = new MyVehicle(this, 4, 1);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayMap = false;
    this.displayCylinder = false;
    this.displayVehicle = false;
    this.selectedTexture = 0;
    this.textureIds = { 'Mountains': 0, 'Desert Mountains': 1 };
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
      vec3.fromValues(15, 15, 15),
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
  update(t) {
    //To be done...
  }
  updateMapTexture() {
    this.cubeMap.updateTex();
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
      this.cubeMap.display();
    }

    if (this.displayVehicle) {
      this.vehicle.display();
    }

    // ---- END Primitive drawing section
  }
}
