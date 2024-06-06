import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/orbitcontrols';

export type CylinderOptions = {
  dotsCount: number;
  dotsRadius: number;
  dotSize: number;
  dotGeometry: number;
  dotColor: number;
  thetaMultiplier: number;
  sinMultiplier: number;
}

function draw({
                dotsCount,
                dotsRadius,
                dotSize,
                dotGeometry,
                dotColor,
                thetaMultiplier,
              }: CylinderOptions, $container: HTMLDivElement): {
  renderer: Three.Renderer,
  dots: Three.Points[],
  camera: Three.Camera,
  scene: Three.Scene
} {
  const scene: Three.Scene = new Three.Scene();
  scene.background = new Three.Color('#010309');

  const camera: Three.PerspectiveCamera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  const renderer: Three.WebGLRenderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window);
  controls.minDistance = 0;
  controls.maxDistance = 15;


  const cylinderGeometry: Three.CylinderGeometry = new Three.CylinderGeometry(1, 1, 2, 32);
  const cylinderMaterial: Three.MeshBasicMaterial = new Three.MeshBasicMaterial({ visible: false });
  cylinderGeometry.material = cylinderMaterial;
  const cylinder: Three.Mesh<Three.CylinderGeometry> = new Three.Mesh(cylinderGeometry, cylinderMaterial);
  scene.add(cylinder);

  const dots: Three.Points[] = [];
  const material: Three.PointsMaterial = new Three.PointsMaterial({ size: dotSize, color: dotColor });

  for (let i: number = 0; i < dotsCount; i++) {
    const theta: number = Math.PI * thetaMultiplier * (i / (dotsCount - 1));
    const y: number = Math.sin(theta * 0.1);

    const geometry: Three.SphereGeometry = new Three.SphereGeometry(dotGeometry);
    const dot: Three.Points = new Three.Points(geometry, material);
    dot.position.set(dotsRadius * Math.cos(theta), y, dotsRadius * Math.sin(theta));
    cylinder.add(dot);
    dots.push(dot);
  }

  $container.appendChild(renderer.domElement);

  return { dots, renderer, camera, scene };
}

export default ($container: HTMLDivElement) => {
  function run(options: CylinderOptions) {
    const { dots, renderer, scene, camera } = draw(options, $container);
    const dotsCount: number = dots.length;

    function animate() {
      requestAnimationFrame(animate);

      for (let i: number = 0; i < dotsCount; i++) {
        const dot: Three.Points = dots[i];
        const theta: number = Math.PI * 2 * (i / (dotsCount - 1));
        dot.position.y = Math.sin(theta * options.sinMultiplier + Date.now() / 1000);
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  return { run };
}
