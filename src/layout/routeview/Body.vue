<template>
  <div class="main-body">
    <header-nav></header-nav>
    <div class="left-fixed-right-auto">
      <div class="content" :style="{'top':headerHt+'px'}">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../header-nav/headerNav.vue";
export default {
  name: "mainBody",
  components: {
    HeaderNav,
  },
  data() {
    return {
      headerHt: 75,
    };
  },

  created: function () {},

  deactivated() {
    this.$store.dispatch("set_menu_show");
  },

  activated() {
    this.$store.dispatch("set_menu_hide");
  },
};
</script>
<style scoped lang='less'>
.content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  color: #3d3a38;
  font-size: 14px;
  border: 1px solid #089680;
}
</style>
