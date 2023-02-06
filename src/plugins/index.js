// 本文件用来统一集中管理要引入的组件
// 引入组件样式
import 'vant/lib/index.css';
import { Swipe, SwipeItem,Popup,Dialog,Notify  } from 'vant';
// 把引入的组件放到一个数组中
let plugins=[
    Swipe, SwipeItem,Popup,Dialog,Notify  
]
export default function getVant(app){
    plugins.forEach(item=>app.use(item))
}
