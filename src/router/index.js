import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store/index";  // 引入store
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemmusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemMusic.vue')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import("../views/Search.vue")
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import("../views/Login.vue")
  },
  {
    path:'/userinfo',
    name:'UserInfo',
    beforeEnter:(to,from,next)=>{ // 单个组件的路由守卫，判断是否登录，登录才能进入个人页
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
          next()
      }else{
        next('/login')
      }
    }, 
    component:()=>import("../views/UserInfo.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局路由守卫
router.beforeEach((to,from)=>{
  if (to.path=='/login' || to.path=='/userinfo') { // 如果要去登录页面，就不显示底部组件
    store.commit('updateIsFooterShow',false)
  }else{
    store.commit('updateIsFooterShow',true)
  }
})
export default router
