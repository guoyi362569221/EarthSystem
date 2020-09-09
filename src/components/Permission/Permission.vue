<template>
  <div>
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
      <h1>管理员权限页面</h1>
      <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
      <p>
        想尝试一下，请
        <router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  created() {
    this.$$onResize(this.onResize);
  },
  mounted() {},
  methods: {
    onResize() {
    },
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {},
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
</style>