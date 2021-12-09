import { createApp } from 'vue'
import router from './router'
import store from './store/index'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css' 
import './common.less'


createApp(App).use(store).use(router).mount('#app')