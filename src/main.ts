import {createApp} from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/src/message.scss"
import "~/styles/index.scss";
import 'uno.css'
import Store, {key} from './store'
import router from "./router";
import axios from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
/*定义全局axios变量$http*/
app.config.globalProperties.$http = axios

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

/*axios拦截器自动将token加入请求头*/
axios.interceptors.request.use((config: any) => {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    if (sessionStorage.getItem('token')) {
        //  注意config.headers.后的变量名要与后端设置的变量名相统一 : authorization
        config.headers.authorization = sessionStorage.getItem('token');
    }
    return config
})

app.use(ElementPlus).use(Store,key).use(router).mount("#app");
