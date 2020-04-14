/**
 * MyObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
  constructor(scene) {
    super(scene);
    this.bottom = new MyQuad(scene);
    this.top = new MyQuad(scene);
    this.front = new MyQuad(scene);
    this.back = new MyQuad(scene);
    this.left = new MyQuad(scene);
    this.right = new MyQuad(scene);

    this.initMat();
  }

  initMat() {

    this.newmatBack = new CGFappearance(this.scene);
    this.newmatBack.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatBack.setDiffuse(0, 0, 0, 1);
    this.newmatBack.setSpecular(0, 0, 0, 1);
    this.newmatBack.setShininess(10.0);
    this.newmatBack.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatBack.loadTexture("images/split_cubemap/back.png");
    this.newmatBack.setTextureWrap("REPEAT", "REPEAT");

    this.newmatBottom = new CGFappearance(this.scene);
    this.newmatBottom.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatBottom.setDiffuse(0, 0, 0, 1);
    this.newmatBottom.setSpecular(0, 0, 0, 1);
    this.newmatBottom.setShininess(10.0);
    this.newmatBottom.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatBottom.loadTexture("images/split_cubemap/bottom.png");
    this.newmatBottom.setTextureWrap("REPEAT", "REPEAT");

    this.newmatFront = new CGFappearance(this.scene);
    this.newmatFront.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatFront.setDiffuse(0, 0, 0, 1);
    this.newmatFront.setSpecular(0, 0, 0, 1);
    this.newmatFront.setShininess(10.0);
    this.newmatFront.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatFront.loadTexture("images/split_cubemap/front.png");
    this.newmatFront.setTextureWrap("REPEAT", "REPEAT");

    this.newmatLeft = new CGFappearance(this.scene);
    this.newmatLeft.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatLeft.setDiffuse(0, 0, 0, 1);
    this.newmatLeft.setSpecular(0, 0, 0, 1);
    this.newmatLeft.setShininess(10.0);
    this.newmatLeft.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatLeft.loadTexture("images/split_cubemap/left.png");
    this.newmatLeft.setTextureWrap("REPEAT", "REPEAT");

    this.newmatRight = new CGFappearance(this.scene);
    this.newmatRight.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatRight.setDiffuse(0, 0, 0, 1);
    this.newmatRight.setSpecular(0, 0, 0, 1);
    this.newmatRight.setShininess(10.0);
    this.newmatRight.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatRight.loadTexture("images/split_cubemap/right.png");
    this.newmatRight.setTextureWrap("REPEAT", "REPEAT");

    this.newmatTop = new CGFappearance(this.scene);
    this.newmatTop.setAmbient(0.9, 0.9, 0.9, 1);
    this.newmatTop.setDiffuse(0, 0, 0, 1);
    this.newmatTop.setSpecular(0, 0, 0, 1);
    this.newmatTop.setShininess(10.0);
    this.newmatTop.setEmission(0.9, 0.9, 0.9, 1);
    this.newmatTop.loadTexture("images/split_cubemap/top.png");
    this.newmatTop.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.scale(50, 50, 50);


    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.newmatBottom.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.bottom.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.newmatTop.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.newmatLeft.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.left.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.newmatRight.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.right.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.newmatBack.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.back.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.newmatFront.apply();

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );

    this.front.display();
    this.scene.popMatrix();


  }
  updateTex() {
    if (this.scene.selectedTexture == 0) {
      this.newmatBack.loadTexture("images/split_cubemap/back.png");
      this.newmatBottom.loadTexture("images/split_cubemap/bottom.png");
      this.newmatFront.loadTexture("images/split_cubemap/front.png");
      this.newmatLeft.loadTexture("images/split_cubemap/left.png");
      this.newmatRight.loadTexture("images/split_cubemap/right.png");
      this.newmatTop.loadTexture("images/split_cubemap/top.png");
    }
    if (this.scene.selectedTexture == 1) {
      this.newmatBack.loadTexture("images/split_skybox/back.png");
      this.newmatBottom.loadTexture("images/split_skybox/bottom.png");
      this.newmatFront.loadTexture("images/split_skybox/front.png");
      this.newmatLeft.loadTexture("images/split_skybox/left.png");
      this.newmatRight.loadTexture("images/split_skybox/right.png");
      this.newmatTop.loadTexture("images/split_skybox/top.png");
    }
  }
}
