import * as dat from 'dat.gui';
import { CylinderOptions } from './cylinder.ts';

export default (defaults: CylinderOptions, drawFn: (options: CylinderOptions) => void) => {
  const gui: dat.GUI = new dat.GUI( { width: 500 });

  gui.add(defaults, 'dotsCount', 50, 250)
    .name('Dots count')
    .step(10)
    .onFinishChange((dotsCount) => drawFn({ ...defaults, dotsCount }))

  gui.add(defaults, 'dotSize', 0.01, 0.1)
    .name('Dot size')
    .step(0.01)
    .onFinishChange((dotSize) => drawFn({ ...defaults, dotSize }))

  gui.add(defaults, 'dotMovementSpeed', 0.1, 100)
    .name('Dot movement speed')
    .step(0.1)
    .onFinishChange((dotMovementSpeed) => drawFn({ ...defaults, dotMovementSpeed }))

  gui.add(defaults, 'ySinFactor', 1, 10)
    .name('Vertical dot movement factor')
    .step(0.1)
    .onFinishChange((ySinFactor) => drawFn({ ...defaults, ySinFactor }))

  gui.add(defaults, 'cylinderHeight', 0.1, 10)
    .name('Cylinder height')
    .step(0.1)
    .onFinishChange((cylinderHeight) => drawFn({ ...defaults, cylinderHeight }))

  gui.add(defaults, 'cylinderRadius', 0.1, 10)
    .name('Cylinder radius')
    .step(0.1)
    .onFinishChange((cylinderRadius) => drawFn({ ...defaults, cylinderRadius }))
};
