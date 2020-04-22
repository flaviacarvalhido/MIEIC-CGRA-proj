 #ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D waterTex;
uniform float timeFactor;
void main() {
	vec4 color = texture2D(waterTex, vec2(0.01*timeFactor,0.1*timeFactor)+vTextureCoord);
	vec4 filter = texture2D(waterMap, vec2(0.01*timeFactor,0.1*timeFactor)+vTextureCoord);

	
	gl_FragColor = color;
}
 