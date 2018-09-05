<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
					<button class="mui-btn mui-btn-numbox-minus" type="button"  >-</button>
					<input class="mui-input-numbox" type="number" value="1" ref="numbox" @change="numboxChanged" >
					<button class="mui-btn mui-btn-numbox-plus" type="button"  >+</button>
		</div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return{
            
        }
    },
    mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
   methods:{
    //    addMore(){
    //        this.$refs.numbox.value++
    //         this.$emit('getNum',parseInt(this.$refs.numbox.value)) 
    //    },
    //    reduceMore(){
    //        if(this.$refs.numbox.value > 1){
    //            this.$refs.numbox.value--;
    //             this.$emit('getNum',parseInt(this.$refs.numbox.value)) 
    //        }
    //        return
    //    },
       numboxChanged(){
             this.$emit('getNum',parseInt(this.$refs.numbox.value)) 
       }
   },
   props:["max"],
   watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
}
</script>
<style lang="scss" scoped>
    .mui-numbox{
        height: 25px;
    }
</style>
