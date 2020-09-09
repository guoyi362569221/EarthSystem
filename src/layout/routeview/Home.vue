<template>
    <div class="home">
        <header-nav ></header-nav>
        <div class="left-fixed-right-auto">
            <left-nav style="position: relative;"></left-nav>
            <div class="right-content" :style="{'bottom':footerHt+'px'}">
                <div class="content" :style="{left:model=='top'?'0px':'calc('+$store.state.leftmenu.width+' + 8px)','top':headerHt+tagsviewHt+'px'}">
                    <!--<bread></bread>-->
                    <!-- <tags-view></tags-view> -->
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
            <!-- <bootom-footer></bootom-footer> -->
        </div>
    </div>
</template>
<script>
    import HeaderNav from '../header-nav/headerNav.vue';
    import LeftNav from '../left-nav/leftNav.vue';
    export default {
        name: 'home',
        components: {
            HeaderNav, LeftNav
        },
        data() {
            return {
                headerHt: 80,
                footerHt: 0,
                model: 'left'||'top',
                tagsviewShow:false,
                tagsviewHt:false?35:0
            }
        },

        computed:{
            calcWidth(){
                return 'calc(100% - '+this.$store.state.leftmenu.width+")";
            }
        }
    }
</script>
<style scoped lang='less'>


    .content {
        position: absolute;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        color:#3d3a38;
        font-size: 14px;
        
    }

.tagsview{
        position: relative;
    }

    .right-content {
        position: absolute;
        /*bottom: 40px;*/
        top: 0;
        left: 0;
        right: 0;
        /*margin-bottom: 60px;*/
    }
</style>
