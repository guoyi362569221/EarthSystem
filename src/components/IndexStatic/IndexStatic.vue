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
              <p>公告总数(次)</p>
              <p>{{staticInfo.ggzs}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <i class="left icoClass01 fa fa-wifi"></i>
            <!-- <img src="./assets/images/info_2.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>监测点总数(个)</p>
              <p>{{staticInfo.jcdzs}}</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <i class="left icoClass03 fa fa-binoculars"></i>
            <!-- <img src="./assets/images/info_3.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>设备类型总数(个)</p>
              <p class="sky">{{staticInfo.sblxzs}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <i class="left icoClass03 fa fa-microchip"></i>
            <!-- <img src="./assets/images/info_4.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>设备总台数(台)</p>
              <p class="sky">{{staticInfo.sbzts}}</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">
          <div class="con_div_text01 left">
             <i class="left icoClass05 fa fa-database"></i>
            <!-- <img src="./assets/images/info_5.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>历史采集数据(条)</p>
              <p class="org">{{staticInfo.lscjsj}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
             <i class="left icoClass05 fa fa-line-chart"></i>
            <!-- <img src="./assets/images/info_6.png" class="left text01_img" /> -->
            <div class="left text01_div">
              <p>今日采集数据(条)</p>
              <p class="org">{{staticInfo.jrcjsj}}</p>
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
              id="mapDIV"
              style="width: calc(100% - 28px);height: calc(100% - 34px);display: inline-block;margin-left: 14px;margin-top: 20px;">
              
            </div>
            <!-- 工具栏 -->
              <div class="tool_pull_down">
                <div class="location" v-popover:infomationPopover>
                  <i class="fa fa-sitemap" aria-hidden="true"></i>
                  <span class="tool_text">切换定位</span>
                  <i class="el-icon-arrow-down"></i>
                  <el-popover v-model="showType_popover" ref="infomationPopover" popper-class="HomePageDisMapWrapMenu" placement="bottom-end" width="80" trigger="click">
                      <div class="popoverContainer" v-if="localInfoObj.location.locate">
                          <div :class="['popoverItem',{'popoverItemChecked':localInfoObj.locate==item.label}]" v-for="(item,index) in localInfoObj.location.locate" :key="index" @click="onLocationChange(item)">
                              <span>{{item.label}}</span>                                
                          </div>
                      </div>
                  </el-popover>
                </div>
                <div class="layer" v-popover:layersPopover>
                  <i class="fa fa-sliders" aria-hidden="true"></i>图层管理
                  <i class="el-icon-arrow-down"></i>
                  <el-popover  ref="layersPopover" popper-class="HomePageDisMapWrapMenu" placement="bottom-end" width="120" trigger="click">
                      <div class="popoverContainer">
                        <el-checkbox-group 
                          v-model="checkedLayers">
                          <div class="popoverItem" style="text-align: left;" v-for="mapItem in mapOptions" :key="mapItem.id" >
                              <el-checkbox :key="mapItem.id" :label="mapItem.id" @change="onLayerChange(mapItem)">{{mapItem.label}}</el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </div>
                  </el-popover>
                </div>
              </div>
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
.tool_pull_down {
  height: 36px;
  border-radius: 4px;
  position: absolute;
  top: 28px;
  right: 22px;
  background: rgb(245, 245, 245);
  line-height: 36px;
  color: #000000;
  z-index: 999;

  .actual_measurement {
    width: auto;
    padding-left: 16px;
    padding-right: 16px;
    height: 20px;
    text-align: left;
    margin-top: 8px;
    float: left;
    border-right: red;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;

    &:hover {
      i {
        color: green;
      }
    }

    i {
      color: #009581;
      margin-right: 6px;
    }

    &.actived {
      font-weight: bold;
      color: green;

      i {
        color: green;
      }
    }
  }

  .location {
    width: auto;
    height: 20px;
    padding-left: 16px;
    padding-right: 10px;
    margin-top: 8px;
    float: left;
    border-right: red;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: green;
      i {
        color: green;
      }
    }
    i {
      font-size: 14px;
      color: #009581;
      margin-right: 6px;
    }
  }

  .layer {
    width: auto;
    height: 20px;
    margin-top: 8px;
    padding-left: 16px;
    padding-right: 10px;
    float: left;
    border-right: red;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    position: relative;

    i {
      font-size: 14px;
      color: #009581;
      margin-right: 6px;
    }

    &:hover {
      color: green;
      i {
        color: green;
      }
    }
  }

  .menuSetting {
    width: auto;
    height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 8px;
    float: left;
    border-right: red;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    position: relative;

    i {
      font-size: 14px;
      color: #009581;
      margin-right: 6px;
      margin-left: 6px;
    }

    &:hover {
      color: green;
      i {
        color: green;
      }
    }
  }

  .menuSettingDisable {
    width: auto;
    height: 20px;
    margin-top: 8px;
    float: left;
    border-right: red;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: #009581;
    i {
      font-size: 14px;
      color: #009581;
      margin-right: 6px;
    }

    &:hover i {
      color: #009581;
    }
  }
}
</style>