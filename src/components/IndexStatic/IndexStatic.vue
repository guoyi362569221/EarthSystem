<template>
  <div class="indexStatic">
    <!--内容部分-->
    <div class="con left">
      <!--数据总概-->
      <div class="con_div">
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <i class="left icoClass01 fa fa-newspaper-o"></i>
            <!-- <img src="./assets/images/info_1.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>发布公告总数(次)</p>
              <p>1235</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <i class="left icoClass01 fa fa-wifi"></i>
            <!-- <img src="./assets/images/info_2.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>监测点总数(个)</p>
              <p>235</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <i class="left icoClass03 fa fa-binoculars"></i>
            <!-- <img src="./assets/images/info_3.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>设备类型总数(个)</p>
              <p class="sky">12356</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <i class="left icoClass03 fa fa-microchip"></i>
            <!-- <img src="./assets/images/info_4.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>设备总台数(台)</p>
              <p class="sky">12356</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">
          <div class="con_div_text01 left">
             <i class="left icoClass05 fa fa-database"></i>
            <!-- <img src="./assets/images/info_5.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>历史采集数据(条)</p>
              <p class="org">12356</p>
            </div>
          </div>
          <div class="con_div_text01 right">
             <i class="left icoClass05 fa fa-line-chart"></i>
            <!-- <img src="./assets/images/info_6.png" class="left text01_img" /> -->
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
            <p id="pieChart1" class="p_chart">
              <chart ref="chart1" style="width: 100%;height:100%;" :options="chart1Options" :auto-resize="true"></chart>
            </p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="./assets/images/title_2.png" />设备类型统计
            </div>
            <p id="histogramChart" class="p_chart">
               <chart ref="chart2" style="width: 100%;height:100%;" :options="chart2Options" :auto-resize="true"></chart>
            </p>
          </div>
        </div>
        <div class="div_any02 left">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">
              <img src="./assets/images/title_0.png" />地图分析
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
            <div id="lineChart" class="p_chart wrap">
              <ul>
                <li>
                  <p>1李东梁-支付宝支付-120元-XXX门店</p>
                </li>
                <li>
                  <p>2李东梁-支付宝支付-120元-XXX门店</p>
                </li>
                <li>
                  <p>3李东梁-支付宝支付-120元-XXX门店</p>
                </li>
                <li>
                  <p>4李东梁-支付宝支付-120元-XXX门店</p>
                </li>
                <li>
                  <p>5云码资源优选-支付宝支付-120元-XXX门店</p>
                </li>
                <li>
                  <p>6云码资源优选-支付宝支付-120元-XXX门店</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="./assets/images/title_4.png" />报警信息统计
            </div>
            <p id="lineChart2" class="p_chart">
              <table class="t_table">
                  <thead>
                      <tr>
                          <th>预警等级</th>
                          <th>昨日预警</th>
                          <th>今日预警</th>
                          <th>同比</th>  
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>注意级</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                      </tr>
                      <tr>
                          <td>警戒级</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                      </tr>
                      <tr>
                          <td>预警级</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                      </tr>
                      <tr>
                          <td>报警级</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                      </tr>
                      <tr>
                          <td>合计</td>
                          <td>0</td>
                          <td>0</td>
                          <td>-</td>
                      </tr>
                  </tbody>
              </table>
            </p>
          </div>
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
@import url(./assets/style/style.less);
</style>