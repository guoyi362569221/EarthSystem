<template>
  <div class="home">
    <header-nav></header-nav>
    <div class="left-fixed-right-auto">
      <left-nav style="position: relative;"></left-nav>
      <div class="right-content" :style="{'bottom':'0px'}">
        <div
          class="content"
          :style="{left:'calc('+$store.state.leftmenu.width+' + 8px)','top':headerHt+'px'}"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../header-nav/headerNav.vue";
import LeftNav from "../left-nav/leftNav.vue";
export default {
  name: "home",
  components: {
    HeaderNav,
    LeftNav,
  },
  data() {
    return {
      headerHt: 80,
    };
  },

  computed: {
    calcWidth() {
      return "calc(100% - " + this.$store.state.leftmenu.width + ")";
    },
  },
};
</script>
<style scoped lang='less'>
.content {
  position: absolute;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  color: #3d3a38;
  font-size: 14px;
}
</style>
