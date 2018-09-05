<template>
    <div class="newsInfo">
        <h3>{{newsInfo.title}}</h3>
        {{id}}
        <p class="subtitle">
            <span>
                发表时间:{{newsInfo.add_time |  datamata('-')}}
            </span>
            <span>
                浏览{{newsInfo.click}}次
            </span>
            
        </p>
        <hr>
         <div v-html="newsInfo.content" ></div>
         <comment-box :id="this.id"></comment-box>
    </div>
   
</template>
<script>
import {Toast} from 'mint-ui'
import comment from '@/components/subcomponents/Comment'
export default {
    data(){
        return{
           id:this.$route.params.id, //方便以后调用
           newsInfo:[]
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get(`api/getnew/${this.id}`).then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.newsInfo = res.body.message[0]
                    Toast('又成功鸟')
                }else{
                    Toast('失败')
                }
            })
            console.log(this.id)
        }
    },
    components:{      //用来注册子组件
        "comment-box":comment
    }
}
</script>
<style lang="scss" >
.newsInfo{
    padding: 0 4px;
    h3{
        font-size: 15px;
        margin: 10px;
        text-align: center;
        color: red;
    };
    .subtitle{
        font-size: 13px;
        color: #22e622;
        display: flex;
        justify-content: space-between;
    };
    div{
        img{
            width:100%;
        }
    }
}
</style>
