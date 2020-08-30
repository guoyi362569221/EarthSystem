<template>
    <div class="sidebar">

        <div class="topIcon" style="">
            <div class="toggle-menu"
                title="收起"
                @click='toggleMenu'
                :style='{display:""}'>

                <i class='fa fa-navicon'></i>
            </div>
		</div>

        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#f4faf9"
            color="#fff"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="(item,index) in $router.options.routes">
                <template v-if="item.children">
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="(child,cindex) in item.children">
                            <el-menu-item
                                :index="child.path"
                                :key="child.path">
                                <i :class="child.icon"></i>
                                <span slot="title">{{ child.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <!-- <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span> -->
                        <div class="iconBg">
                            <i :class="item.icon"
                            :style="{'font-size':'14px','color':'#fc6e19'}"></i>
                        </div>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../Bus/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                }
            ]
        };
    },
    methods:{
        toggleMenu() {
            this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
            this.leftWidth = this.$store.state.leftmenu.width;
            this.iconSize = this.$store.state.leftmenu.menu_flag ? '14px' : '15px';
            this.$root.eventBus.$emit('toggleMenu');
        },
    },
    computed: {
        onRoutes() {
        if(this.$route.path)
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
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
    width: 200px;
    top: 36px;
}
.sidebar > ul {
    height: 100%;
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

.iconBg{
    display:inline-block;
    width:28px;
    height:28px;
    line-height:28px;
    border-radius:50%;
    text-align:center;
    margin-right:6px;
    vertical-align:middle;
}

.iconBg .fa{
    vertical-align: baseline;
}
</style>
