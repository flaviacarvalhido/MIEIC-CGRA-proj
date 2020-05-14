class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.flag = new MyPlane(this.scene, 40,true);
        
        this.shader = new CGFshader(this.scene.gl, "shaders/bandeira.vert", "shaders/bandeira.frag");
        this.texture = new CGFtexture(this.scene, "images/cubemap.png");

        this.shader.setUniformsValues({uSampler: 0});
        this.shader.setUniformsValues({speedF: 0});
        this.shader.setUniformsValues({timeF: 0});

        //this.initTexture(this.scene);

    }

    /*initTexture(scene){
        //texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/cubemap.png');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
        
        //shaders
        this.shader = new CGFshader(this.scene.gl, "shaders/bandeira.vert", "shaders/bandeira.frag");
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ speedFactor: 3 });
        this.shader.setUniformsValues({ timeFactor: 3 });

        this.texture = new CGFtexture(this.scene,"images/cubemap.png");
    }*/
    
    update(t, v){
        this.shader.setUniformsValues({speedF: v});
        this.shader.setUniformsValues({timeF: t / 100 % 1000 });
    }
	
	display(){
        this.scene.pushMatrix();

        this.scene.translate(0,-1.3,0);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.scale(1.4,0.7,1);
        this.scene.translate(0,0,-2);
        this.scene.rotate(Math.PI/2,0,1,0);

        this.scene.setActiveShader(this.shader);
        this.texture.bind(0);
        this.flag.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        
/*
        this.scene.setActiveShader(this.shader);
        this.texture.bind(3);
        
        this.scene.pushMatrix();

        //this.scene.translate(0,-1.3,0);
        //this.scene.rotate(Math.PI/2, -1, 0, 0);

        this.scene.translate(0,0,-2.8);
        this.scene.scale(1,1,2);
        this.scene.rotate(Math.PI/2, 0, -1, 0);
        this.flag.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);*/
    }
}