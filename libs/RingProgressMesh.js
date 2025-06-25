import { Mesh, PlaneBufferGeometry, ShaderMaterial } from './three/three.module.js';

const vshader = `
varying vec2 vUv;
void main() {	
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fshader = `
#define PI2 6.28318530718

uniform float uProgress;

varying vec2 vUv;

// Hexagon distance function
float hexagon(vec2 pt, vec2 center, float radius) {
  pt -= center;
  pt = abs(pt);
  float hex = max(pt.x * 0.866025 + pt.y * 0.5, pt.y); // 0.866025 = sqrt(3)/2
  return step(hex, radius);
}

// Hexagonal arc for progress
float hexArc(vec2 pt, vec2 center, float radius, float percent) {
  float result = 0.0;
  pt -= center;
  
  // Transform to polar-like coordinates for hexagon
  float angle = atan(pt.y, pt.x);
  float len = length(pt);
  float innerRadius = radius * 0.5;
  
  // Normalize angle to [0, PI2]
  angle = mod(angle + PI2, PI2);
  percent = clamp(percent, 0.0, 1.0);
  float arcAngle = PI2 * percent;
  
  // Hexagon distance for outer and inner boundaries
  float outerHex = max(abs(pt.x) * 0.866025 + abs(pt.y) * 0.5, abs(pt.y));
  float innerHex = outerHex * 0.5; // Scale for inner hexagon
  
  if (outerHex < radius && outerHex > innerRadius && angle < arcAngle) {
    float edgeWidth = radius * 0.05;
    result = smoothstep(innerRadius, innerRadius + edgeWidth, outerHex) - smoothstep(radius - edgeWidth, radius, outerHex);
  }
  
  return result;
}

void main (void)
{
  vec4 bgColor = vec4(0.0, 0.0, 0.0, 1.0);
  vec4 arcColor = vec4(0.0, 0.0, 1.0, 1.0);
  vec2 center = vec2(0.5);
  vec4 color = vec4(0.0);
  color += hexagon(vUv, center, 0.5) * bgColor;
  color += hexArc(vUv, center, 0.4, uProgress) * arcColor;
  gl_FragColor = color; 
}`

class RingProgressMesh extends Mesh{
    constructor( scale = 1 ){
        super();
        
        const uniforms = {
          uProgress: { value: 0.0 },
        }

        this.material = new ShaderMaterial( {
          uniforms: uniforms,
          vertexShader: vshader,
          fragmentShader: fshader,
          alphaTest: 0.5,
          transparent: true
        } );
        
        this.geometry.dispose();
        this.geometry = new PlaneBufferGeometry();
        this.scale.set( scale, scale, scale );
        this.progress = 1;
    }
    
    set progress( value ){
        if ( value<0 ) value = 0;
        if ( value>1 ) value = 1;
        this.material.uniforms.uProgress.value = value;
    }
    
    get progress(){
        return this.material.uniforms.uProgress.value;
    }
}

export { RingProgressMesh };