<template>
  <div id="app">
    <!-- 动态判断 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
  @import 'assets/styles/element-#009581/index.css';
  @import 'assets/styles/element-override/#009581/index.css';
* {
    margin: 0px;
    padding: 0px;
  }
</style>
