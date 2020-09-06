<template>
    <div class="wrapper">
        <!-- <v-head></v-head> -->
        <headNav></headNav>
        <v-sidebar></v-sidebar>
        <div class="content-box" :style="{'left': left}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import headNav from '../head-nav-v1/HeadNav.vue'
import vSidebar from '../Sidebar/Sidebar.vue';
import vTags from '../Tags/Tags.vue';
export default {
    name: 'Home',
    components: {
        headNav,
        vSidebar,
        vTags
    },
    data() {
        return {
            left: '65px',
            tagsList: []
        }
    },
    methods:{
    },
    created() {
        // this.left = 'calc('+this.$store.state.leftmenu.width+' + 8px)'
        this.$root.eventBus.$off('toggleMenu');
        this.$root.eventBus.$on('toggleMenu', (isCollapse,leftmenuWidth) => {
            debugger
            this.collapse = isCollapse;
           
            this.left = 'calc('+leftmenuWidth+' + 8px)';
        });

        // // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        this.$root.eventBus.$off('tags');
        this.$root.eventBus.$on('tags', msg => {
             alert("")
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>

<style scoped >
    
    .content-box {
        left: 208px;
    }
    

</style>