class MyFlag extends CGFobject {
    constructor(scene) {
        super(scene);
        this.flag = new MyPlane(this.scene, 40, true);

        this.initTexture(this.scene);

    }

    initTexture(scene) {
        //texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/cubemap.png');
        this.texture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //shaders
        this.shader = new CGFshader(this.scene.gl, "shaders/bandeira.vert", "shaders/bandeira.frag");
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ speedF: 0 });
        this.shader.setUniformsValues({ timeF: 0 });
    }

    update(t, v) {
        this.shader.setUniformsValues({ timeF: t });
        this.shader.setUniformsValues({ speedF: v });
    }

    display() {


        //flag

        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();

        this.scene.translate(-10, -3.7, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 10);
        this.texture.apply();

        this.flag.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}