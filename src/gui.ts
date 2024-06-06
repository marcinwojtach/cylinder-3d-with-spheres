import * as dat from 'dat.gui';
import { CylinderOptions } from './cylinder.ts';

export default (defaults: CylinderOptions, drawFn: (options: CylinderOptions) => void) => {
  const gui: dat.GUI = new dat.GUI();

  gui.add(defaults, 'dotsCount', 50, 250)
   .step(10)
   .onFinishChange((dotsCount) => drawFn({...defaults, dotsCount }))
};
