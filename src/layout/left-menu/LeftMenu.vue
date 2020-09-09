<template>
    <div class="left left-menu" v-if="menuWidth>0"
         :style="{'width':menuWidth,'height':win_size.height,'top':headerHt+5+'px','display':leftWidth=='0px'?'none':''}"
         id='admin-left'>
         <div class="topIcon" style="">
        <div class="toggle-menu"
             :title="$store.state.leftmenu.menu_flag?'收起':'展开'"
             @click='toggleMenu'
             :style='{display:leftWidth=="0px"?"none":""}'>

            <i class='fa fa-navicon'></i>
            <!--<i :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>-->
        </div>
		</div>


        <div>

            <el-row class='tac'
                    v-for="(route,index) in $router.options.routes"
                    :key='route.path'
                    v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
                <el-col :span="24">

                    <el-menu :default-active="$route.path" class="el-menu-vertical"
                             :collapse="!$store.state.leftmenu.menu_flag"
                             router unique-opened>

                        <el-submenu v-for="(item,index) in route.children" :index="item.path"
                                    v-if="item.children&&!item.hidden"
                                    >

                            <template slot="title">
                                 <div class="iconBg" :style="{ 'margin-left':$store.state.leftmenu.menu_flag?0:'-8px'}">
                                    <i :class="item.icon" :style="{'font-size':iconSize,'color':getColors(index)}"></i>
                                </div> 
                                <span slot="title" >{{item.name}}</span>

                                <!--<i :class="item.icon"-->
                                <!--style="position: absolute;right: 5px"></i>-->
                            </template>

                            <el-menu-item v-for='(child,cindex) in item.children'
                                          :index='$store.state.router.headerCurRouter+"/"+item.path+"/"+child.path'
                                          v-if="!child.hidden">
                                <i :class="child.icon"
                                   :style="{'font-size':iconSize}"></i>
                                <span slot="title">
										{{child.name}}
										</span>
                                <!--<i :class="child.icon"></i>-->
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                                v-else-if="!item.hidden"
                                :index='$store.state.router.headerCurRouter+"/"+item.path'
                                >
                                 <div class="iconBg" :style="{'margin-left':$store.state.leftmenu.menu_flag?0:'-8px'}">
                            <i :class="item.icon"
                               :style="{'font-size':iconSize,'color':getColors(index)}"></i>
                               </div>
                            <span slot="title">{{item.name}}
                                <!--<i :class="item.icon"-->
                                <!--&gt;</i>-->
                                <!-- {{route.path+'/'+item.path+'/'+child.path}} --></span>
                        </el-menu-item>

                    </el-menu>


                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import LeftMenu from './LeftMenu.js';

    export default LeftMenu;
</script>

<style scoped lang='less'>
    @import url(./assets/style/LeftMenu.less);

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
