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

    //offset.z=-sin(-vTextureCoord.s*20.0 + 3.0*timeF + 3.0*speedF);
	offset.z=-sin(-vTextureCoord.s*20.0 + 5.0*timeF + 5.0*speedF);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}