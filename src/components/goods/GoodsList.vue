<template>
    <div class="goods-list">
       
           
        <router-link class="goods-all" v-for="item in goodsLists" :key="item.id" :to="'/home/goodsInfo/'+item.id">
        
            <div class="goods-title">
                <img :src="item.img_url" alt="">
                <p>{{item.title}}</p>
            </div>
            <div class="goods-body">
                <div class="goods-price">
                    <span>￥{{item.sell_price}}</span>
                    <span>￥{{item.market_price}}</span>
                </div>
                <div class="goods-sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link>
       <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
       
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageindex:1,
            goodsLists:[],
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.goodsLists = this.goodsLists.concat(res.body.message)
                     Toast('获取手机列表成功')
                } else {
                    Toast('获取手机列表失败')
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList()
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    padding: 5px;
    
    .goods-all{
         min-height: 293px;
        border: 1px solid #ccc;
        width: 49%;
        float: left;
        // box-shadow: 2px 1px 1px 2px #ccc;
        margin-bottom: 10px;
        // color: green;
        &:nth-child(2n) {
            margin-left: 2%;
        }
    }
    .goods-title{
        background-color: #fff;
        padding: 3px;
        img{
            width: 100%;
        };
        p{
            height: 70px;
            font-size: 12px;
            color: black;
        }
    }
    .goods-body{
        width: 100%;
        background-color: #ccc;
        .goods-price{
            margin-bottom: 10px;
            span{
                &:nth-child(1){
                    color: red;
                    font-size: 16px;
                    margin-right: 10px;
                };
                &:nth-child(2){
                    color: green;
                    font-size: 14px;
                    text-decoration: line-through;
                }
            }
            
        };
        .goods-sell{
            display: flex;
            justify-content: space-between;
            font-size:14px;
            color: black;
            
        }
    }
}
</style>
