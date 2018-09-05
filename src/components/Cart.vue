<template>
    <div class="shoppingCar">


        <div class="carList" v-for="(item,i) in goodsList" :key="item.id">
                    <div class="mui-card">
                        <div class="mui-card-content">
                            <div class="mui-card-content-inner shoppingCarContent">
                                <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="goodsSelectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
                                ></mt-switch>
                                <img :src="item.thumb_path" alt="">
                                <div class="cartAll">
                                    <h3>{{item.title}}</h3>
                                    <p>
                                        <span>￥{{item.sell_price}}</span>
                                        <numcar :numberbar="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numcar>
                                        
                                        <a href="#" @click.prevent="deleteGoods(item.id,i)">删除{{$store.getters.getGoodsCount[item.id]}}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner goodsContent">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span class="red">0</span> 件， 总价 <span class="red">￥0</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                        

					</div>
                   
				</div>

		</div>
    

    </div>
</template>
<script>
import {Toast} from "mint-ui"
import numcar from '@/components/subcomponents/Numcar'
export default {
    data(){
        return{
            goodsList:[],
            selectInfo:1
        }
    },
    created(){
        this.getCarList()
    },
    methods:{
        bumbersss(count){
            this.selectInfo = count
        },
        getCarList(){
             //获取所有商品的id
            var goodsArr = [];
            this.$store.state.car.forEach((item)=>{
                goodsArr.push(item.id)
            })
            this.$http.get(`api/goods/getshopcarlist/${goodsArr.join(',')}`).then(res => {
                console.log(res.body);
                if(res.body.status === 0){
                    this.goodsList = res.body.message
                } else{
                    Toast('获取数据失败了了了了了')
                }
                
            })
        },
        deleteGoods(id,index){
            //点击删除，先删除这一行，再删除store里的数据
            this.goodsList.splice(index,1);
            this.$store.commit('getGoodsCountHelle',id)
        },
        goodsSelectedChanged(id,val){
            console.log(id + '-----' + val);
            this.$store.commit('updateGoodsSelected',{
                id:id,
                selected:val
            })
        }
    },
    components:{
        numcar
    }
}
</script>
<style lang="scss" scoped>
   .shoppingCar{
       background: #ccc;
       overflow: hidden;
       .carList{
            .shoppingCarContent{
                display: flex;
                align-content: center;
                img{
                    
                    height: 60px
                }
                .cartAll{   
                    h3{
                        font-size: 13px;
                        margin-bottom: 20px;
                    }
                    p{
                        display: flex;
                        flex-direction: center;
                        justify-content: space-between;
                        span{
                            color: red;
                            font-weight: bold;
                        }
                        
                    }
                }
            }
       }
       .goodsContent{
           display: flex;
           justify-content: space-between;
           align-content: center;
           .red{
               color:red;
               font-size:16px;
           }
       }
   }
</style>