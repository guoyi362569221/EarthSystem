<template>
  <!--内容部分-->
  <div class="con left">
    <!--数据总概-->
    <div class="con_div">
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="./assets/images/info_1.png" class="left text01_img" />
          <div class="left text01_div">
            <p>灾害点总数(个)</p>
            <p>1235</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="./assets/images/info_2.png" class="left text01_img" />
          <div class="left text01_div">
            <p>监测点总数(个)</p>
            <p>235</p>
          </div>
        </div>
      </div>
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="./assets/images/info_3.png" class="left text01_img" />
          <div class="left text01_div">
            <p>设备类型总数(个)</p>
            <p class="sky">12356</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="./assets/images/info_4.png" class="left text01_img" />
          <div class="left text01_div">
            <p>设备总台数(台)</p>
            <p class="sky">12356</p>
          </div>
        </div>
      </div>
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="./assets/images/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>历史采集数据(条)</p>
            <p class="org">12356</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="./assets/images/info_6.png" class="left text01_img" />
          <div class="left text01_div">
            <p>今日采集数据(条)</p>
            <p class="org">12356</p>
          </div>
        </div>
      </div>
    </div>
    <!--统计分析图-->
    <div class="div_any">
      <div class="left div_any01">
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="./assets/images/title_1.png" />仪器状态统计
          </div>
          <p id="pieChart1" class="p_chart"></p>
        </div>
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="./assets/images/title_2.png" />设备类型统计
          </div>
          <p id="histogramChart" class="p_chart"></p>
        </div>
      </div>
      <div class="div_any02 left">
        <div class="div_any_child div_height">
          <div class="div_any_title any_title_width">
            <img src="./assets/images/title_0.png" />东北地图
          </div>
          <div
            id="mapChart"
            style="width:97.5%;height:95%;display: inline-block;padding-left: 1.25%;padding-top:2.2%"
          ></div>
        </div>
      </div>
      <div class="right div_any01">
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="./assets/images/title_3.png" />系统公告
          </div>
          <p id="lineChart" class="p_chart"></p>
        </div>
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="./assets/images/title_4.png" />报警信息统计
          </div>
          <p id="lineChart2" class="p_chart"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexStaticJs from "./IndexStatic.js";
export default IndexStaticJs;
</script>

<style lang="less" scoped>
@import url(./assets/style/style.css);
</style>