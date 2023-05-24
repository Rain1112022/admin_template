import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import './assets/styles/index.scss';
import CustomComponent from './components/index';
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.use(CustomComponent);
app.use(ElementPlus, { locale: zhCn });
app.mount('#app');
