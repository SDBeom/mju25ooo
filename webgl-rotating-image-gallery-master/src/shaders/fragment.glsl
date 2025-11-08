precision highp float;
 
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
uniform sampler2D tMapBack;
uniform float uPosition;
 
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
  );
 
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  
  // 뒷면인지 확인 (normal.z가 음수면 뒤쪽)
  if (vNormal.z > 0.0) {
    // 앞면
    gl_FragColor.rgb = texture2D(tMap, uv).rgb;
  } else {
    // 뒷면
    vec2 uvFlipped = vec2(1.0 - uv.x, uv.y);
    gl_FragColor.rgb = texture2D(tMapBack, uvFlipped).rgb;
  }
  
  gl_FragColor.a = 1.0;
}