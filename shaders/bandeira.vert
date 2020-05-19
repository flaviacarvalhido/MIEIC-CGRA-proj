attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeF;
uniform float speedF;

varying vec2 vTextureCoord;


void main() {
	vTextureCoord = aTextureCoord;

    vec3 offset = vec3 (0.0,0.0,0.0);
	
    offset.z=0.06*sin(vTextureCoord.s*15.0 + 0.2*timeF + 5.0*speedF);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}