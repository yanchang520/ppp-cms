<template>
    <div class="comment">
        <h2>发表评论</h2>
        <textarea placeholder="请输入要bb的话(最多bb120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-all">
            <div class="cmt-list" v-for="(item,index) in commentList" :key="item.index">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | datamata('-')}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined' ? "麻豆没说，很懒":item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageIndex:1,
            commentList:[],
            msg:''
        }
    },
    created() {
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageIndex}`).then(res =>{
                console.log(res.body.message);
                if(res.body.status === 0){
                    // this.commentList = res.body.message
                    this.commentList =this.commentList.concat(res.body.message)
                } else {
                    Toast('获取评论失败了')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComment()
        },
        postComments(){
            //校验
            if(this.msg.trim().length === 0){
               return  Toast('评论数据不能为空')
            }
            this.$http.post(`api/postcomment/${this.id}{content:this.msg.trim()}`).then(res =>{
               
                if(res.body.status === 0){
                    var mst = {content:this.msg.trim(),user_name:"匿名用户",add_time:Date.now()}
                    //添加到数组
                    this.commentList.unshift(mst);
                    //然后清空
                    this.msg=""
                } else{
                    Toast('评论失败了')
                }
            })
        }
    },
    props:['id']
}
</script>
<style lang="scss" scoped>
.comment{
    h2{
        font-size: 18px;
    };
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    };
    .cmt-all{
        .cmt-list{
            margin: 10px;
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
