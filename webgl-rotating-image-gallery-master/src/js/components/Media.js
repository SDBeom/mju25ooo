import { Mesh, Program, Texture } from "ogl";
import vertex from "../../shaders/vertex.glsl";
import fragment from "../../shaders/fragment.glsl";
import { map } from "../utils/math";

export default class Media {
  constructor({
    gl,
    geometry,
    scene,
    renderer,
    screen,
    viewport,
    image,
    length,
    index,
  }) {
    this.extra = 0;
    this.imageWidth = 0;
    this.imageHeight = 0;

    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.renderer = renderer;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;

    this.createShader();
    this.createMesh();

    this.onResize();
  }
  createShader() {
    // 앞면 텍스처
    const frontTexture = new Texture(this.gl, {
      generateMipmaps: false,
    });
    
    // 뒷면 텍스처
    const backTexture = new Texture(this.gl, {
      generateMipmaps: false,
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment,
      vertex,
      uniforms: {
        tMap: { value: frontTexture },
        tMapBack: { value: backTexture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: 3 },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    let loadedCount = 0;
    const checkAndResize = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        this.onResize();
      }
    };

    // 앞면 이미지 로드
    const frontImage = new Image();
    frontImage.src = this.image;
    frontImage.onload = (_) => {
      frontTexture.image = frontImage;
      this.imageWidth = frontImage.naturalWidth;
      this.imageHeight = frontImage.naturalHeight;

      this.program.uniforms.uImageSize.value = [
        frontImage.naturalWidth,
        frontImage.naturalHeight,
      ];
      
      checkAndResize();
    };

    // 뒷면 이미지 로드 (항상 맵 이미지)
    const backImage = new Image();
    backImage.src = "./img/onlineinvitmap.webp";
    backImage.onload = (_) => {
      backTexture.image = backImage;
      checkAndResize();
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    
    // 양면 렌더링 활성화
    this.plane.program.cullFace = false;

    this.plane.setParent(this.scene);
  }

  setScale(x, y) {
    // 원본 이미지 크기 사용
    if (this.imageWidth > 0 && this.imageHeight > 0) {
      // 이미지 비율 유지하면서 화면에 맞게 크기 조정
      const imageRatio = this.imageWidth / this.imageHeight;
      const screenRatio = this.screen.width / this.screen.height;
      
      let scaleX, scaleY;
      
      if (imageRatio > screenRatio) {
        // 이미지가 더 넓음 - 너비 기준
        scaleX = this.viewport.width * 0.8;
        scaleY = scaleX / imageRatio;
      } else {
        // 이미지가 더 높음 - 높이 기준
        scaleY = this.viewport.height * 0.8;
        scaleX = scaleY * imageRatio;
      }
      
      this.plane.scale.x = scaleX;
      this.plane.scale.y = scaleY;
    } else {
      // 이미지 로드 전 기본 크기
      x = 320;
      y = 300;
      this.plane.scale.x = (this.viewport.width * x) / this.screen.width;
      this.plane.scale.y = (this.viewport.height * y) / this.screen.height;
    }

    this.plane.program.uniforms.uPlaneSize.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
  }
  setX() {
    this.plane.position.x =
      -(this.viewport.width / 2) + this.plane.scale.x / 2 + this.x;
  }

  onResize({ screen, viewport } = {}) {
    if (screen) {
      this.screen = screen;
    }

    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [
        this.viewport.width,
        this.viewport.height,
      ];
    }
    this.setScale();

    this.padding = 0.8;
    this.height = this.plane.scale.y + this.padding;

    this.heightTotal = this.height * this.length;

    this.y = this.height * this.index;
  }

  update(scroll, direction) {
    this.plane.position.y = this.y - scroll.current - this.extra;

    // map position from 5 to 15 depending on the scroll position
    const position = map(
      this.plane.position.y,
      -this.viewport.height,
      this.viewport.height,
      5,
      15
    );

    this.program.uniforms.uPosition.value = position;

    this.speed = scroll.current - scroll.last;

    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    const planeOffset = this.plane.scale.y / 2;
    const viewportOffset = this.viewport.height;

    this.isBefore = this.plane.position.y + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.y - planeOffset > viewportOffset;

    if (direction === "up" && this.isBefore) {
      this.extra -= this.heightTotal;

      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === "down" && this.isAfter) {
      this.extra += this.heightTotal;

      this.isBefore = false;
      this.isAfter = false;
    }
  }
}
