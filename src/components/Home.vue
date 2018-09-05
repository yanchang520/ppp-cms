<template>
    <div class="home">
        <!-- 轮播图 -->
        <lunbotu :lunbotuList="lunbotuList" :isfull="true"></lunbotu>
        <!-- 九宫格 -->
        
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newsList">
		                    <img src="../lib/images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻咨询</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
		                    <img src="../lib/images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
		
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import lunbotu from '@/components/subcomponents/Lunbotu.vue'
export default {
    data(){
        return{
           lunbotuList:[],
        }
    },
    created(){
        this.getLunBoTu()
    },
    methods:{
        getLunBoTu(){
            this.$http.get('api/getlunbo').then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.lunbotuList = res.body.message
                    Toast('成功')
                } else{
                    Toast('失败')
                }
            })
        }
    },
    components:{
        lunbotu,
    }
}
</script>
<style lang="scss" scoped>
.home{
 .mui-grid-view{
        background: #fff;
        .mui-table-view-cell{
            border:none
        }
        img{
            width: 50%;
            height:50%
        }
       
    }
    //    .mui-table-view.mui-grid-view .mui-table-view-cell
       .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body
        {
            font-size: 13px;
        }
}
   
</style>

