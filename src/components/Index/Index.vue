<template>
  <div class="body-wrap">
    <div id="mapDiv">
    </div>
    <!-- 左边的站点管理 -->
      <div class="station-manage">
        <div class="station-manage-content">
          <div class="station-manage-content-head">
            <i class="fa fa-cogs"></i>
            <span>监测站点管理</span>
          </div>
          <div class="station-manage-content-tree">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            ></el-tree>
          </div>
        </div>
        <div class="station-manage-slider">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>
      <!-- 工具栏 -->
      <div class="tool_pull_down">
        <div class="location" v-popover:infomationPopover>
          <i class="fa fa-sitemap" aria-hidden="true"></i>
          <span class="tool_text">切换定位</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="layer" v-popover:layersPopover>
          <i class="fa fa-sliders" aria-hidden="true"></i>图层管理
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <!-- 监测数据详情 -->
      <div class="monitor-manage">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import IndexJs from "./Index.js";
export default IndexJs;
</script>


<style lang="less" scoped>
@import url(./assets/style/style.css);
.body-wrap {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
#mapDiv {
  width: 100%;
  height: 100%;
}

.tool_pull_down {
  height: 36px;
  border-radius: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
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

.station-manage {
  position: absolute;
  top: 8px;
  left: 0px;
  bottom: 0px;
  width: 280px;
  background-color: #f3f3f3;
  border: 1px solid #089680;
  border-bottom: none;
  z-index: 1000;
  box-shadow: 12px 20px 14px rgba(0, 0, 0, 0.1);
  .station-manage-content {
    height: 100%;
    width: 100%;
    .station-manage-content-head {
      height: 36px;
      background-color: #089680;
      line-height: 36px;
      color: #fff;
      font-size: 14px;
      letter-spacing: 1px;
      i {
        margin-left: 8px;
      }
      span {
        margin-left: 8px;
      }
    }
    .station-manage-content-tree {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 36px;
      bottom: 0px;
    }
  }
  .station-manage-slider {
    position: absolute;
    width: 21px;
    height: 114px;
    position: absolute;
    right: -21px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAByCAYAAAC85pp0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEyQTVEQjQ0RTJGMTFFQUE5ODNERTFCNTUwMDZGMUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEyQTVEQjM0RTJGMTFFQUE5ODNERTFCNTUwMDZGMUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTRBN0Q5NkU0RDQ4MTFFQTlEN0RGOEExRjhGRTc4MkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTRBN0Q5NkY0RDQ4MTFFQTlEN0RGOEExRjhGRTc4MkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6iTtPOAAAG70lEQVR42uxa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);
    bottom: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
    i {
      position: relative;
      left: 9px;
    }
  }
}

.monitor-manage {
  // position: absolute;
  // top: 52px;
  // bottom: 8px;
  // left: 300px;
  // right: 8px;
  position: absolute;
  top: calc(50% - 250px);
  left: calc(50% - 450px);
  width: 900px;
  height: 500px;
  margin: 0px auto;
  background-color: rgb(245, 245, 245);
  z-index: 10000;
  padding: 8px;
  border: 1px solid #089680;
}
</style>
