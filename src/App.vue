<template>
  <div id="app">
    <!-- 动态判断 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div id="wait-box" :style="{'display':$store.state.global.ajax_loading?'block':'none'}">
        <center><br>加载中...<br><br>
            <div class="wait-spinner3">
                <div class="r1"></div>
                <div class="r2"></div>
                <div class="r3"></div>
                <div class="r4"></div>
                <div class="r5"></div>
            </div>
        </center>
    </div>
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
  	@-webkit-keyframes sk-stretchdelay {

        0%,
        40%,
        100% {
            -webkit-transform: scaleY(0.4)
        }

        20% {
            -webkit-transform: scaleY(1.0)
        }
    }

    @keyframes sk-stretchdelay {

        0%,
        40%,
        100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }

        20% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }
  #wait-box {
        color: #fff;
        z-index: 81;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -90px;
        text-align: center;
        /* padding-top: 30px; */
        box-shadow: 0px 0px 8px rgba(0, 0, 0, .20);
        background-color: rgba(8,150,128,0.7);
        width: 180px;
        height: 120px;
        z-index: 1000;
    }

    .wait-spinner3 {
        display: inline-block;
        
        height: 40px;
    }

    .wait-spinner3>div {
        background-color: #333;
        height: 100%;
        width: 6px;
        display: inline-block;
        margin: 1px;
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .wait-spinner3>.r1 {
        background-color: #29fd2e;
    }

    .wait-spinner3>.r2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
        background-color: #fffd37;
    }

    .wait-spinner3>.r3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
        background-color: #fd7e23;
    }

    .wait-spinner3>.r4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
        background-color: #fc0d1b;
    }

    .wait-spinner3>.r5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
        background-color: #97084c;
    }
</style>
