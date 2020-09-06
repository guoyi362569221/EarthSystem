<template>
    <div class="sidebar">
        <div class="topIcon" style="">
            <div class="toggle-menu"
                title="收起"
                @click='toggleMenu'>
                <i class='fa fa-navicon'></i>
            </div>
		</div>

        <el-menu
            class="sidebar-el-menu"
            :style="{'width':getMenuWith()}"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="rgb(231, 245, 238)"
            color="#fff"
            active-text-color="#fff"
            unique-opened
            router>
            <template v-for="(item,index) in $router.options.routes">
                <template v-if="item.children&&item.children.length>0">
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon"
                            :style="{'font-size':'14px','color':item.color+'!important'}"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="(child,cindex) in item.children">
                            <el-menu-item
                                :index="child.path"
                                :key="child.path">
                                <i :class="child.icon"
                                :style="{'font-size':'14px','color':child.color+'!important'}"></i>
                                <span slot="title">{{ child.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <i :class="item.icon"
                            :style="{'font-size':'14px','color':item.color+'!important'}"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import Sidebar from './Sidebar.js';

export default {
    data() {
        return {
            leftWidth: '200px',
            iconSize: '14px',
            collapse: true
        }
    },
    methods:{
        toggleMenu() {
            this.$store.dispatch(this.$store.state.leftmenu.menuShow ? 'set_menu_close' : 'set_menu_open');
            this.leftWidth = this.$store.state.leftmenu.width;
            // this.$root.eventBus.$emit('toggleMenu');
            this.collapse = !this.collapse;
            debugger
            this.$root.eventBus.$emit('toggleMenu',this.collapse,this.leftWidth);
        },
        getMenuWith(){
            return this.$store.state.leftmenu.width;
        }
    },
    computed: {
        onRoutes() {
            if(this.$route.path)
                return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.$store.dispatch(this.$store.state.leftmenu.menuShow ? 'set_menu_open' : 'set_menu_close');
        this.leftWidth = this.$store.state.leftmenu.width;
        this.collapse = !this.$store.state.leftmenu.menuShow;

        // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        this.$root.eventBus.$emit('toggleMenu',this.collapse,this.leftWidth);
        // bus.$on('collapse', msg => {
        //     this.collapse = msg;
        //     alert(msg)
        //     bus.$emit('collapse-content', msg);
            
        // });
    }
};
</script>

<style scoped >
	@import url(./assets/style/style.css);
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 80px;
    bottom: 0;
    overflow-y: scroll;
    border:1px solid #089680;
    background-color: #f4faf9;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    /* width: 200px; */
    top: 36px;
}
.sidebar > ul {
    width: 100%;
}

.topIcon{
    width: 100%;
    height: 36px;
    position: absolute;
    background-color: #089680;
    right: 0;
    top:0;
}

.toggle-menu {
	width: 40px;
	height: 36px;
	background: #089680;
	position: absolute;
	right: 0;
	top:0;
	/*left: 190px;*/
	z-index: 1000;
	cursor: pointer;
	line-height: 36px;
	text-align: center;
	color: #FFF;
	font-size: 18px;
	opacity: 0.8;
	transition: opacity .3s ease-out;
}

.toggle-menu:hover{
    opacity: 1;
}

</style>
