<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button"  >-</button>
					<input class="mui-input-numbox" type="number" :value="numberbar" ref="numbox" @change="goodChanged" >
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
   props:['numberbar','goodsid'],
   
   methods:{
       goodChanged(){
           console.log(this.goodsid)
           console.log(this.$refs.numbox.value)
           this.$store.commit('getNumCarHello',{
               id:this.goodsid,
               count:this.$refs.numbox.value
           })
           
       }
   }
}
</script>
<style lang="scss" scoped>

</style>
