import ScaleBox from './ScaleBox.vue';
import EcahrtItem from './EcahrtItem.vue';
import Screenfull from './Screenfull.vue';
import type { App } from 'vue';

export { ScaleBox, EcahrtItem, Screenfull };

const component = [ScaleBox, EcahrtItem, Screenfull];
const CustomComponent = {
  install(App: App<Element>) {
    component.forEach((item) => {
      App.component(item.name, item);
    });
  },
};

export default CustomComponent;
