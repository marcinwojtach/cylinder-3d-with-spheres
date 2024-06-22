import * as dat from 'dat.gui';
import { CylinderOptions } from './cylinder.ts';

export default (defaults: CylinderOptions, drawFn: (options: CylinderOptions) => void) => {
  const gui: dat.GUI = new dat.GUI( { width: 500 });

  gui.add(defaults, 'dotsCount', 50, 250)
    .name('Dots count')
    .step(10)
    .onFinishChange((dotsCount) => drawFn({ ...defaults, dotsCount }))

  gui.add(defaults, 'dotMovementSpeed', 0.1, 100)
    .name('Dot movement speed')
    .step(0.1)
    .onFinishChange((dotMovementSpeed) => drawFn({ ...defaults, dotMovementSpeed }))

  // gui.add(defaults, 'dotSpread', 1, 10)
  //   .name('Dot spread multiplier')
  //   .step(0.1)
  //   .onFinishChange((dotSpread) => drawFn({ ...defaults, dotSpread }))

  gui.add(defaults, 'cylinderHeight', 0.1, 10)
    .name('Cylinder height')
    .step(0.1)
    .onFinishChange((cylinderHeight) => drawFn({ ...defaults, cylinderHeight }))
};
