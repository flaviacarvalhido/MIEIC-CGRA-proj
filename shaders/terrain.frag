#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D heightmap;
uniform sampler2D terrain;

void main() {
	vec4 color = texture2D(terrain, vTextureCoord);
	vec4 filter = texture2D(heightmap, vec2(0.0,0.1)+vTextureCoord);

	
	gl_FragColor = color;
}
 