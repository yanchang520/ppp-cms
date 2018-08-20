<template>
    <div class="home">
        <!-- 轮播图 -->
        <mt-swipe :auto="9000" >
            <mt-swipe-item v-for="item in itemList" :key="item.img">
                <img :src="item.img" alt="">
                </mt-swipe-item>  
        </mt-swipe>
        <!-- 九宫格 -->
        
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻咨询</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../lib/images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
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
export default {
    data(){
        return{
           itemList:[] 
        }
    },
    created(){
        this.getLunBoTu()
    },
    methods:{
        getLunBoTu(){
            this.$http.get('http://027xin.com:8899/api/getlunbo').then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.itemList = res.body.message
                    Toast('成功')
                } else{
                    Toast('失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
     .mint-swipe{
        height:200px;
         .mint-swipe-item{
            &:nth-child(1){
                background-color: blue;
            }
            &:nth-child(2){
                background-color: pink;
            }
            &:nth-child(3){
                background-color: green;
            }
            img{
                height: 100%;
                width: 100%;
            }
        }
        
    }


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
</style>

