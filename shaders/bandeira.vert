attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeF;
uniform float speedF;

varying vec2 vTextureCoord;


void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	offset.z += sin(0.5*timeF+aVertexPosition.x+abs(speedF*3.0)) * 0.5 * (aVertexPosition.x + 0.5);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}