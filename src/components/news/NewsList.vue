<template>
    <div class="news">
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsInfo/'+item.id" class="">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间：{{item.add_time | datamata('-')}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				

			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            newsList:[]
        }
    },
    created(){
        this.getnewsList()
    },
    methods:{
        getnewsList(){
            this.$http.get('api/getnewslist').then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.newsList = res.body.message
                    Toast('成功鸟')
                } else{
                    Toast('失败鸟')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.mui-table-view{

    h1{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #22e622;
        display: flex;
        justify-content: space-between;
    }
}
</style>


