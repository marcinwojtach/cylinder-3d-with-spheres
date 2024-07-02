import * as Three from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/orbitcontrols';

export type CylinderOptions = {
  dotsCount: number;
  dotSize: number;
  dotColor: number;
  dotMovementSpeed: number;
  thetaMultiplier: number;
  ySinFactor: number;
  cylinderRadius: number;
  cylinderHeight: number;
};

function createLight(scene: Three.Scene): void {
  const light: Three.DirectionalLight = new Three.DirectionalLight(0xffffff, 1.2);
  light.position.set(2, 5, 10);
  scene.add(light)
}

function createCamera(renderer: Three.Renderer): Three.PerspectiveCamera {
  const camera: Three.PerspectiveCamera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 6;
  const controls: OrbitControls = new OrbitControls(
    camera,
    renderer.domElement,
  );
  controls.listenToKeyEvents(window);
  controls.minDistance = 0;
  controls.maxDistance = 15;

  return camera;
}

function createSpheres(scene: Three.Scene, cylinder: Three.Mesh<Three.CylinderGeometry>, options: CylinderOptions): Three.Mesh[] {
  const spheres: Three.Mesh[] = [];

  for (let i: number = 0; i < options.dotsCount; i++) {
    const geometry: Three.SphereGeometry = new Three.SphereGeometry(options.dotSize, 32, 16);
    const material: Three.MeshLambertMaterial = new Three.MeshLambertMaterial({ color: 0xffffff, opacity: 0.3, alphaTest: 0.1 });
    const sphere: Three.Mesh<Three.SphereGeometry> = new Three.Mesh(geometry, material);

    scene.add(sphere);

    const theta: number = Math.PI * options.thetaMultiplier * (i / (options.dotsCount - 1));
    const y: number = Math.sin(theta * 0.1);

    sphere.position.set(
      Math.cos(theta) * options.cylinderRadius,
      y,
      Math.sin(theta) * options.cylinderRadius,
    );

    cylinder.add(sphere);

    spheres.push(sphere);
  }

  return spheres;
}

function createCylinder(scene: Three.Scene): Three.Mesh<Three.CylinderGeometry> {
  const cylinderGeometry: Three.CylinderGeometry = new Three.CylinderGeometry(
    1,
    1,
    2,
    32,
  );
  const cylinderMaterial: Three.MeshBasicMaterial = new Three.MeshBasicMaterial(
    { visible: false },
  );
  // @ts-ignore
  cylinderGeometry.material = cylinderMaterial;
  const cylinder: Three.Mesh<Three.CylinderGeometry> = new Three.Mesh(
    cylinderGeometry,
    cylinderMaterial,
  );

  scene.add(cylinder);

  return cylinder;
}

function draw(
  options: CylinderOptions,
  $container: HTMLDivElement,
): {
  renderer: Three.Renderer;
  spheres: Three.Mesh[];
  camera: Three.Camera;
  scene: Three.Scene;
} {
  const scene: Three.Scene = new Three.Scene();
  scene.clear();
  scene.background = new Three.Color('#010309');

  const renderer: Three.WebGLRenderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createLight(scene);
  const cylinder: Three.Mesh<Three.CylinderGeometry> = createCylinder(scene);
  const camera: Three.PerspectiveCamera = createCamera(renderer);
  const spheres: Three.Mesh[] = createSpheres(scene, cylinder, options);

  $container.appendChild(renderer.domElement);

  return { renderer, scene, spheres, camera };
}

export default ($container: HTMLDivElement) => {
  let currentOptions: CylinderOptions | null = null;

  function run(options: CylinderOptions) {
    currentOptions = options;
    $container.innerHTML = '';
    const { renderer, scene, spheres, camera } = draw(options, $container);
    const spheresCount: number = spheres.length;

    function animate() {
      requestAnimationFrame(animate);

      for (let i: number = 0; i < spheresCount; i++) {
        const theta: number = Math.PI * 2 * (i / (spheresCount - 1));
        spheres[i].position.y =
          Math.sin(
            theta * options.ySinFactor +
            (Date.now() / 10000) * options.dotMovementSpeed,
          ) * options.cylinderHeight;
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  window.addEventListener('resize', () => {
    if (currentOptions) {
      run(currentOptions);
    }
  })

  return { run };
};
