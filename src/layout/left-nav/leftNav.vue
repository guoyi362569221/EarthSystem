<template lang="html">
	<div class="content left-nav" :style="{'width':contentWidth,'top':headerHt+8+'px','height':win_size.height}">
		<div class="top">
			<div :class="['top-icon',{'isFold':isFold}]" @click="toggleShow">
				<i class="fa fa-bars"></i>
			</div>
		</div>
		<el-scrollbar ref="leftNavScrollbar" style="height:calc(100% - 40px)"  wrap-class="warp-divs" view-class="menu-content" tag="div">
		<div class="warp-divs" :style="{'height':'calc('+win_size.height+'- 40px)'} ">


		<ul :class="['menu-content',{'menu-content-fold':isFold}]">
			<div class="hover-box" style="" v-show="hoverBoxShow">
			</div>
			<li v-if="!item.hidden&& $route.matched.length && $route.matched[0].path===item.path" v-for="(item,idx) in  $router.options.routes">
				<ul v-if="item.children&&item.children.length>0">
					<li v-for="(oneLevel,index) in item.children" @click="changeRouter(item.path+'/'+oneLevel.path,oneLevel,item)" :class="['onelevel-menu',{'onelevel-active-router':isActived(item,oneLevel),'onelevel-single-route':!oneLevel.children,'hasHoverBox':!hoverBoxShow}]">
						<left-menu-collapse @collChange="collShowChange" :iconColor="getColors(index)" :isFold="isFold" :icon="oneLevel.icon" :isShow="setCollapseInitShow(item.path,oneLevel.path) " :title="oneLevel.name" v-if="oneLevel.children&&oneLevel.children.length>0">
							<ul v-if="oneLevel.children&&oneLevel.children.length>0">
								<li v-for="(twoLevel,tidx) in oneLevel.children" @click.stop="changeTwoRouter(item.path+'/'+oneLevel.path+'/'+twoLevel.path)" :class="['twolevel-menu',{'twolevel-active-router':isActived(item,oneLevel,twoLevel),'hasHoverBox':!hoverBoxShow}]">
									<el-tooltip :disabled=!isFold class="left-menu-tooltip" effect="dark" :content="twoLevel.name" placement="left-start">
										<div class="twolevel-menu-icon">
											<i :class="twoLevel.icon" :style="{'font-size':iconSize,'color':'#008572'}"></i>
										</div>
									</el-tooltip>
									<div class="twolevel-menu-text">
										{{twoLevel.name}}
									</div>
								</li>
							</ul>
						</left-menu-collapse>
						<div v-if="!oneLevel.children" class="onelevel-menu-label-content">
							<div>
								<el-tooltip :disabled=!isFold class="left-menu-tooltip" effect="dark" :content="oneLevel.name" placement="left-start">
									<div class="onelevel-menu-icon">
										<i :class="oneLevel.icon" :style="{'font-size':iconSize,'color':getColors(index)}"></i>
									</div>
								</el-tooltip>
								<div class="onelevel-menu-text">
									{{oneLevel.name}}
								</div>
							</div>
						</div>
					</li>

				</ul>

			</li>

		</ul>
		</div>
		</el-scrollbar>
	</div>

</template>

<script>
import leftMenuCollapse from "./leftMenuCollapse";
export default {
  name: "leftNav",
  components: {
    "left-menu-collapse": leftMenuCollapse,
  },
  data() {
    return {
      cRouter: [],
      win_size: {
        height: "",
      },
      headerHt: 75,
      footerHt: 0,
      access: false,
      hoverBoxShow: true,
      iconSize: "14px",
      colors: [
        "#fc6e19",
        "#369cef",
        "#33ca53",
        "#fab33e",
        "#615caf",
        "#6ad3c3",
        "#489ff9",
      ],
    };
  },
  methods: {
    setSize() {
      this.win_size.height =
        "calc(" +
        this.$_jQuery(window).height() +
        "px - " +
        (this.headerHt + 5) +
        "px)";
      if (this.$refs.leftNavScrollbar) {
        this.$refs.leftNavScrollbar.update();
      }
    },
    changeRouter(item, route, parent) {
      if (item && !route.children) {
        if (parent) {
          this.setTranistion(item, parent);
        }
        setTimeout(() => {
          this.$router.push(item);
        }, 300);
      }
    },
    setTranistion(item, parent) {
      let num = 0;
      if (parent.children && parent.children.length > 0) {
        for (let i = 0; i < parent.children.length; i++) {
          if (parent.path + "/" + parent.children[i].path === item) {
            break;
          }
          if (!parent.hidden && this.$route.matched.length) {
            num++;
          }
        }
      }
      this.$_jQuery(".left-nav .hover-box")
        .stop(true, true)
        .animate(
          {
            top: num * 50,
          },
          300
        );
    },
    getColors(idx) {
      return this.colors[idx % this.colors.length];
    },
    collShowChange(val) {},
    changeTwoRouter(item, e) {
      if (item) {
        this.$router.push(item);
      }
    },
    setCollapseInitShow(item, oneLevel) {
      if (this.$route.fullPath.includes(item + "/" + oneLevel)) {
        return true;
      } else {
        return false;
      }
    },
    setCurRouter(rItem) {
      let route = rItem || this.$route;
      let rootPath = route.matched[0].path,
        fullPath = route.path;
      this.$store.dispatch("set_cur_route", {
        rootPath,
        fullPath,
      });
    },
    toggleShow() {
      //     	  this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
      if (!this.isFold) {
        this.iconSize = "14px";
        this.$store.dispatch("set_menu_close");
      } else {
        this.iconSize = "15px";
        this.$store.dispatch("set_menu_open");
      }
      this.$root.eventBus.$emit("toggleMenu");
    },
    hasTwoLevel() {
      let has = false;
      for (let i = 0; i < this.$router.options.routes.length; i++) {
        let item = this.$router.options.routes[i];

        if (
          this.$route.matched[0].path === item.path &&
          item.children &&
          item.children.length > 0
        ) {
          for (let x = 0; x < item.children.length; x++) {
            if (
              item.children[x].children &&
              item.children[x].children.length > 0
            ) {
              has = true;
              break;
            }
          }
        }
        if (has) {
          break;
        }
      }
      return has;
    },
    // 判断是否当前选中路由
    isActived(headerItem, oneLevel, twoLevel) {
      if (twoLevel) {
        //判断二级菜单当前选中
        if (
          headerItem.path + "/" + oneLevel.path + "/" + twoLevel.path ===
          this.$store.state.router.leftCurRouter
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        //判断一级菜单当前选中
        if (
          headerItem.path + "/" + oneLevel.path ===
            this.$store.state.router.leftCurRouter &&
          !oneLevel.children
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  created() {
    this.$_jQuery(window).resize(() => {
      this.setSize();
    });
    this.$nextTick(() => {
      this.setSize();
      this.setCurRouter();
      setTimeout(() => {
        let newRoutes = this.$router.options.routes.filter((item) => {
          return item.path === this.$route.matched[0].path;
        })[0];
        this.setTranistion(this.$route.fullPath, newRoutes);
        this.hoverBoxShow = !this.hasTwoLevel();
      }, 0);
    });
  },

  computed: {
    contentWidth() {
      return this.$store.state.leftmenu.width;
    },
    isFold(val) {
      return !this.$store.state.leftmenu.menu_flag;
    },
  },
  watch: {
    $route(to, from, next) {
      setTimeout(() => {
        this.setCurRouter(to);
      }, 300);

      if (to.matched[0].path !== from.matched[0].path) {
        let newRoutes = this.$router.options.routes.filter((item) => {
          return item.path === to.matched[0].path;
        })[0];
        this.setTranistion(to.path, newRoutes);
        this.hoverBoxShow = !this.hasTwoLevel();
      }
      // 对路由变化作出响应...
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./assets/style/style.css");
@import url("./assets/style/style.less");
.hover-box {
  position: absolute;
  height: 49px;
  width: 5px;
  background-color: #089680;
  margin-left: -1px;
}
li {
  list-style: none;
}
</style>
