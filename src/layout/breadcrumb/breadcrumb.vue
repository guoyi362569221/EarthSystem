<template>
  <div class="crumbs">
    <el-breadcrumb class="linkWay" separator-class="el-icon-arrow-right">
      <span
        class="fa fa-tachometer"
        style="float:left;margin-right:10px;font-size:14px;color:rgb(17, 161, 138);"
      ></span>
      <el-breadcrumb-item
        v-for="(item) in breadList"
        :key="item.path"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  methods: {
    getBreadcrumb() {
        let levelList = [];
        let matcheds = this.$route.matched.filter((item) => item.name);
        if (matcheds && matcheds.length > 0) {
            for (let i = 0; i < matcheds.length; i++) {
            const item = matcheds[i];
            levelList.push({
                path: item["path"],
                name: item["name"],
            });
            }
        }
        this.$store.commit("setBreadListMutations", JSON.stringify(levelList));
        this.breadList = this.$store.getters.getBreadListState;
    //   var breadNumber =
    //     typeof this.$route.meta.breadNumber != "undefined"
    //       ? this.$route.meta.breadNumber
    //       : 1; //默认为1
    //   var newBread = { name: this.$route.name, path: this.$route.fullPath }; //当前页面的
    //   var breadList = this.$store.getters.breadListState; //获取breadList数组
    //   breadList.splice(breadNumber, breadList.length - breadNumber, newBread);
    //   breadList = JSON.stringify(breadList);
    //   this.$store.commit("breadListMutations", breadList);
    //   this.breadList = this.$store.getters.breadListState;
    },
  },
  watch: {
    //"$route": "getBreadcrumb"
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>