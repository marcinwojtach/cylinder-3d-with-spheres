import "./style.css";
import cylinder, { CylinderOptions } from "./cylinder.ts";
import gui from "./gui.ts";

const app: HTMLDivElement = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="container">
    <div class="canvas-container"></div>
  </div>
`;

try {
  const cylinderModule = cylinder(document.querySelector(".canvas-container")!);

  const defaults: CylinderOptions = {
    dotsCount: 100,
    dotSize: 0.05,
    dotColor: 0xffffff,
    dotMovementSpeed: 25,
    ySinFactor: 3,
    thetaMultiplier: 20,
    cylinderRadius: 2.5,
    cylinderHeight: 2,
  };

  cylinderModule.run(defaults);

  gui(defaults, (options: CylinderOptions) => cylinderModule.run(options));
} catch (e) {
  app.innerHTML = `Failed to start the app ${e}`;
}
