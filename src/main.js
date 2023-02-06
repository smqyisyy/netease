import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 从集中管理插件引入vant组件
import getVant from './plugins'
const app = createApp(App);
app.use(store)
getVant(app)
app.use(router).mount('#app')

