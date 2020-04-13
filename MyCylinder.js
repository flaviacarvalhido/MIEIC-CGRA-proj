class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
      super(scene);
      this.slices = slices;
      this.initBuffers();
    }
  
    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     */
    initBuffers() {
        this.initAngle = 2 * Math.PI / this.slices;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.initLateral();
        this.initBottomTop();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initLateral(){
        let angle = 0;
        for (var i = 0; i <= this.slices; ++i) { // a primeira aresta é processada duas vezes no inicio e no fim
            this.vertices.push( Math.cos(angle), 0, -Math.sin(angle),
                                Math.cos(angle), 1, -Math.sin(angle));

            this.indices.push(   //face antes da aresta
                0+2*i, 2+2*i, 3+2*i,

                3+2*i, 1+2*i, 0+2*i
            );                  

            this.normals.push(  Math.cos(angle), 0, -Math.sin(angle),//uma aresta dois vertices, logo duas normais
                                Math.cos(angle), 0, -Math.sin(angle));

            let tex = (i + 1) / this.slices;
            this.texCoords.push(tex, 1,
                                tex, 0);
                            
            angle += this.initAngle;
        }
    }

    initBottomTop() {
        var a = 2 * (this.slices + 1);
        let angle = 0;

        for (var i=0; i <= this.slices; ++i) {
            this.vertices.push( Math.cos(angle), 0, -Math.sin(angle),
                                Math.cos(angle), 1, -Math.sin(angle));

            this.indices.push(  a + 2*i, a + 2*i - 2, a,
                                a+1, (a+1) + 2*i - 2, (a+1) + 2*i);
               
            this.normals.push(  0, -1, 0,
                                0, 1, 0);
                            
            angle += this.initAngle;
        }
    }
}