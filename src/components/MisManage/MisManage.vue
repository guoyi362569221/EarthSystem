<template>
<!-- 搜索框 -->
    <div class="seach-container">
      <div class="flex flex-wrap justify-between">
        <!-- 项目 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span class="letterspance2">项&nbsp;&nbsp;&nbsp;目</span>
            </div>
            <div class="form-box123456-item">
              <el-cascader
                filterable
                :show-all-levels="false"
                :options="listChildOrgInfoList"
                v-model="projectId"
                :props="defaultProps1"
                @change="projectchange"
                size="small"
                placeholder="请选择项目"
                clearable
              ></el-cascader>
            </div>
          </div>
        </div>
        <!-- 计划开始时间 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span>计划开始时间</span>
            </div>
            <div class="form-box123456-item">
              <el-date-picker
                size="small"
                clearable
                type="daterange"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- 计划结束时间 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span>计划结束时间</span>
            </div>
            <div class="form-box123456-item">
              <el-date-picker
                size="small"
                clearable
                type="daterange"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- 计划状态 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span class="letterspance2">计划状态</span>
            </div>
            <div class="form-box123456-item">
              <el-select size="small"  placeholder="请选择计划状态">
                <el-option label="全部" value></el-option>
                <el-option label="进行中" value="0"></el-option>
                <el-option label="已完成" value="1"></el-option>
                <el-option label="逾期" value="2"></el-option>
                <el-option label="未开始" value="3"></el-option>
                <el-option label="准备中" value="4"></el-option>
                <el-option label="未按时开工" value="5"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 里程碑 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span class="letterspance2">里程碑</span>
            </div>
            <div class="form-box123456-item">
              <el-select size="small"  placeholder="请选择里程碑">
                <el-option label="全部" value></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 责任人 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span class="letterspance2">责任人</span>
            </div>
            <div class="form-box123456-item">
               <el-select size="small"  placeholder="请选择里程碑">
                <el-option label="全部" value></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div classs="form-container">
          <div class="form-box123456">
            <div class="form-box123456-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box123456-item">
              <el-input size="small" placeholder="请输入项目计划名称"></el-input>
            </div>
          </div>
        </div>
        <div classs="form-container">
          <div class="form-box123456" style="width:400px">
            <el-button size="small" type="primary" @click="refreshList">搜索</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import MisManageJs from './MisManage.js';
export default MisManageJs;
</script>

<style lang="less" scoped>
@import url(./assets/style/style.css);

@itemWdth:300px;
.form-container{
  width:@itemWdth;
  margin:15px;
}
.form-box123456{
  width: 400px;
  margin-bottom:10px;
}
.form-box123456-label{
  float: left;
  width: 99px;
  height:30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #908888;
  white-space: nowrap;
  border:1px solid #DCDFE6;
  border-right: 0;
  border-radius: 4px 0px 0px 4px;
  text-overflow:ellipsis;
  overflow:hidden;
  background: #f6f7f9;
}
.form-box123456-item{
  margin-left:100px;
  width:@itemWdth;
  .el-input__inner{
    border-radius: 0 4px 4px 0!important;
  }
  .el-select,.el-input,.el-cascader{
    display: block;
    width: @itemWdth;
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: @itemWdth;
  }
}
</style>