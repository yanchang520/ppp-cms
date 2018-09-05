<template>
    <div class="goodsInfo">

        <!-- 小球动画 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
       <!-- 轮播图区域 -->
       <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{GoodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥{{GoodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:<span>￥{{GoodsInfo.sell_price}}</span>
                        </p>
                        <p class="infoBuy">
                            购买数量:<numboxs @getNum="getInfo" :max="GoodsInfo.stock_quantity"></numboxs>
                            <mt-button size="large" type="primary">立即购买</mt-button>
                            <mt-button size="large" type="danger" @click="addCar"> 加入购物车</mt-button>
                        </p>
					</div>
				</div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{GoodsInfo.goods_no}}</p>
                        <p>库存情况:{{GoodsInfo.stock_quantity}}</p>
                        <p>上架时间:{{GoodsInfo.add_time | datamata('-')}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button size="small" type="primary" @click="getDoes(id)">图文介绍</mt-button>
                    <mt-button size="small" type="danger" @click="getComment(id)">商品评论</mt-button>
				</div>
		</div>
    </div>
</template>
<script>
import swiper from '@/components/subcomponents/Lunbotu'
import numboxs from '@/components/subcomponents/Numbox'
export default {
    data(){
        return{
            id:this.$route.params.id,
            GoodsInfo:[],
            lunbotuList:[],
            ballFlag:false,
            selectInfo:1
        }
    },
    created(){
        this.getGoodsInfo();
        this.getLunbotu()
    },
    methods:{
        getGoodsInfo(){
            this.$http.get(`api/goods/getinfo/${this.id}`).then(res =>{
                console.log(res.body.message[0],1111)
                if(res.body.status === 0){
                    this.GoodsInfo = res.body.message[0]     
                }
            })
        },
        // 轮播图
        getLunbotu(){
            this.$http.get(`api/getthumimages/${this.id}`).then(res =>{
               
                res.body.message.forEach(item => {
                    console.log(item)
                    item.img = item.src
                });
                this.lunbotuList = res.body.message;
            })
        },
        // 跳转到图文介绍
        getDoes(id){
            console.log(9999)
            this.$router.push({
                name:'GetDoes',params:{id}
            })
        },
        //跳转商品评论页
        getComment(id){
            this.$router.push({
                 path:'/home/getComment/'+this.id
            })
        },
        //加入购物车
        addCar(){
            this.ballFlag = !this.ballFlag;

            //将物品的信息传入到vuex里
            var goodsInfoList = {
                //物品的id,物品的数量,价格，selected:false
                id:this.id,
                count:this.selectInfo,
                price:this.GoodsInfo.sell_price,
                selected: true
            };
            // 调用store里的mutations里的来将商品加入到购物车
            this.$store.commit('getCar',goodsInfoList)
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        

        enter(el,done){
            el.offsetWidth;
            //获取小球在页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            console.log(ballPosition,66666)
            //获取徽标的在页面的位置
            const numberPosition = document.getElementById('number').getBoundingClientRect();
            console.log(numberPosition,88888)
            //x方向的差值
           const xDist =numberPosition.left - ballPosition.left
           const yDist =numberPosition.top - ballPosition.top

            
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.74,.15,.83,.67)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },


        getInfo(count){
            this.selectInfo =count;

            console.log(this.selectInfo)
        }
    },
    components:{
        swiper,
        numboxs
    }
}
</script>
<style lang="scss" scoped>
.goodsInfo{
    // background-color: #ccc;
    overflow: hidden;
    .mui-card{
        .mui-card-content-inner{
            .price{

            };
            .infoBuy{
                margin-top: 10px;
            }
        }
        .mint-swipe{
           height: 200px;
        }
    };
    .ball{
        width: 15px;
        height: 15px;
        background: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 370px;
        left: 80px;
        
    }
}
</style>
