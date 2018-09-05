<template>
    <div class="getDoesAll">
        <h3>{{DoesList.title}}</h3>
        <hr>
        <div class="getDoes" v-html="DoesList.content">233</div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            id:this.$route.params.id,
            DoesList:[]
        }
    },
    created(){
        this.getDoes()
    },
    methods:{
        getDoes(){
            this.$http.get(`api/goods/getdesc/${this.id}`).then(res =>{
                console.log(res.body);
                if(res.body.status === 0){
                    this.DoesList = res.body.message[0]
                } else {
                    Toast('获取图文列表失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" >
.getDoesAll{
    padding: 4px;



    .getDoes{
        img{
            width: 100%;
        }
    }
}
</style>
