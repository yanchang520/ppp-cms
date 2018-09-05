<template>
    <div>
        2323
        <cmtbox :id="id"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '@/components/subcomponents/Comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id
        }
    },
   
    components:{
        cmtbox,
    }
}
</script>
<style lang="scss" scoped>

</style>
