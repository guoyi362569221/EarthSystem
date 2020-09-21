<template>
  <div class="home">
    <header-nav></header-nav>
    <div class="left-fixed-right-auto">
      <left-nav style="position: relative;"></left-nav>
      <div
        class="content"
        :style="{left:'calc('+$store.state.leftmenu.width+' + 8px)','top':headerHt+'px'}"
      >
        <bread-crumb></bread-crumb>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../header-nav/headerNav.vue";
import LeftNav from "../left-nav/leftNav.vue";
import BreadCrumb from "../breadcrumb/breadcrumb.vue";
export default {
  name: "home",
  components: {
    HeaderNav,
    LeftNav,
    BreadCrumb,
  },
  data() {
    return {
      headerHt: 83,
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
  padding: 8px;
  position: absolute;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  color: #3d3a38;
  font-size: 14px;
  border: 1px solid #089680;
}
</style>
