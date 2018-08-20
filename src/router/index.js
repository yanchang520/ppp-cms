import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member.vue'
import Cart from '@/components/Cart'
import Search from '@/components/Search'


Vue.use(Router)

export default new Router({
  linkActiveClass:"mui-active",
  routes: [
    {path:'/',redirect:'/home'},
   {name:'Home',  path:'/home',component:Home},
   {name:'Member',path:'/member',component:Member},
   {name:"Cart",path:"/cart",component:Cart},
   {name:"Search",path:"/search",component:Search}
  ]
})
