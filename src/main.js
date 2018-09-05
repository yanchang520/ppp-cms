// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra(1).css'


import vueResource from 'vue-resource'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car' ) || '[]') 

const store = new Vuex.Store({
      state:{
        car:car 
      },
      mutations:{
          getCar(state,goodsInfoList){

            var flag = false
              state.car.some(item =>{
                // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
                // 2. 如果没有，则直接把 商品数据，push 到 car 中即可
                if(item.id == goodsInfoList.id ){
                  item.count += parseInt(goodsInfoList.count);
                  flag =true ;  //这个开关不能写在后面
                  return true;
                }
              })
              if(!flag){
                state.car.push(goodsInfoList);
              }
              localStorage.setItem('car',JSON.stringify(state.car))
          },
          getNumCarHello(state,goodsInfoList){
            //修改购物车里面的数量值
              state.car.some(item =>{
                if(item.id == goodsInfoList.id){
                  item.count = parseInt(goodsInfoList.count);
                  return true
                }
              })
              // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
              localStorage.setItem('car', JSON.stringify(state.car))
          },
          getGoodsCountHelle(state,id){
              state.car.some((item,i) =>{
                  if(item.id == id){
                      state.car.splice(i,1);
                      return true
                  }
              })
              localStorage.setItem('car', JSON.stringify(state.car))
          },
          updateGoodsSelected(state,info){
            state.car.some(item => {
                if (item.id == info.id) {
                  item.selected = info.selected
                  return true
                }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
          }
      },
      getters:{  //相当于计算属性
        getNumCar(state){
          var b = 0;
            state.car.forEach(item =>{
              b += item.count
            });
            return b
        },
        getGoodsCount(state){
            var obj = {};
            state.car.forEach(item =>{
              obj[item.id] =item.count
            }) 
            return obj
        },
        getGoodsSelected(state){
          var o ={};
          state.car.forEach(item =>{
            o[item.id] = item.selected
          })
          return o
        }


        
      }
})



Vue.use(Mint)
Vue.use(vueResource)
// 设置全局请求地址
Vue.http.options.root="http://027xin.com:8899"
Vue.http.options.emulateHTTP = true;

Vue.filter('datamata',function (dataStr,seperator) { 
        let  date = new Date(dataStr);
        console.log(date);
        const YYYY =date.getFullYear();
        const DD =date.getMonth()+1;
        const TT = date.getDate();
        const nn =date.getHours();
        const yy =date.getMinutes();
        const dd = date.getSeconds()
        return YYYY+seperator+DD + seperator+TT+ ' ' +nn +":"+yy+":"+dd

 })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
