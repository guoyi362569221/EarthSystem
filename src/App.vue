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
    
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 8px;  /*滚动条宽度*/
    height: 8px;  /*滚动条高度*/
    background-color: #dcdfe6;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #089680;  /*滚动条的背景颜色*/
  }
</style>
