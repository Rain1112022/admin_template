import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import dts from 'vite-plugin-dts';
// console.log('process', process);
const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig((config: UserConfig) => {
  // console.log(config); //{ mode: 'dev', command: 'serve', ssrBuild: false }
  let env = {};
  const isDev = config.mode === 'dev';
  const isBuild = config.mode === 'pro';
  if (isDev) {
    env = loadEnv(
      process.argv[3] === '--mode' ? process.argv[4] : process.argv[3],
      root,
      ''
    );
  } else {
    env = loadEnv('pro', root, '');
  }
  return {
    // 连接后端服务时使用 server.proxy 设置代理
    // 当请求路径以 api 开头，说明调用的是真实后端服务
    sourcemap: true,
    base: isDev ? './' : '/',
    //define，定义全局常量；
    define: {
      'process.env': env,
    },
    plugins: [
      vue(),
      dts({
        insertTypesEntry: true,
        copyDtsFiles: false,
      }),
      viteMockServe({
        mockPath: 'mock',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          //前置加载提供每个vue页面的全局样式，比如定义了$theme-color，通过前置加载可以使用
          additionalData: `@use "@/assets/styles/global.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      //vite中内置了移除console的设置，只需配置一下
      minify: 'terser',
      outDir: 'dist',
      sourcemap: false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          //是否移除debugger、console
          drop_debugger: false,
          drop_console: false,
        },
      },
    },
    server: {
      proxy: {
        '^/api': {
          // target: env.VITE_APP_API_BASE_URL,
          target: 'http://localhost:3001',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
