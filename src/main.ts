import './style.css'
import cylinder, { CylinderOptions } from './cylinder.ts';
import gui from './gui.ts';

const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <div class="canvas-container"></div>
  </div>
`

try {
  const cylinderModule = cylinder(document.querySelector('.canvas-container')!);

  const defaults: CylinderOptions = {
    dotsCount: 150,
    dotSize: 0.001,
    dotGeometry: 0.005,
    dotsRadius: 0.8,
    dotColor: 0xffffff,
    thetaMultiplier: 500,
    sinMultiplier: 0.7
  };

  cylinderModule.run(defaults);

  gui(defaults, (options: CylinderOptions) => cylinderModule.run(options))
} catch (e) {
  app.innerHTML = `Failed to start the app ${e}`;
}
