import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member.vue'
import Cart from '@/components/Cart'
import Search from '@/components/Search'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GetDoes from '@/components/goods/GetDoes'
import GetComment from '@/components/goods/GetComment'
Vue.use(Router)

export default new Router({
  linkActiveClass:"mui-active",
  routes: [
    {path:'/',redirect:'/home'},
   {name:'Home',  path:'/home',component:Home},
   {name:'Member',path:'/member',component:Member},
   {name:"Cart",path:"/cart",component:Cart},
   {name:"Search",path:"/search",component:Search},
   {name:'NewsList',path:'/home/newsList',component:NewsList},
   {name:'NewsInfo',path:'/home/newsInfo/:id',component:NewsInfo},
   {name:'GoodsList',path:'/home/goodsList',component:GoodsList},
   {name:'GoodsInfo',path:'/home/goodsInfo/:id',component:GoodsInfo},
   {name:'GetDoes',path:'/home/getdoes/:id',component:GetDoes},
   {name:'GetDoes',path:'/home/getComment/:id',component:GetComment}
  ]
})
