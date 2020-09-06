<template>
    <div class="wrapper">
        <!-- <v-head></v-head> -->
        <headNav></headNav>
        <div class="content-box" :class="{'content-collapse':collapse}">
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
import vTags from '../Tags/Tags.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        headNav,
        vTags
    },
    created() {
        this.$root.eventBus.$off('toggleMenu');
        this.$root.eventBus.$on('toggleMenut', (isCollapse) => {
            this.collapse = isCollapse;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        this.$root.eventBus.$off('tags');
        this.$root.eventBus.$on('tags', msg => {
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
    @import url(./assets/style/style.css); 
    
    .content-box {
        left: 0;
    }

</style>
