<template>
  <div class="contentPanel">
    <!-- 搜索框 -->
    <div class="seach-container">
      <div class="flex flex-wrap justify-between">
        <div class="customer-title">
          <i class="fa fa-search">&nbsp;&nbsp;&nbsp;&nbsp;检索</i>
        </div>
        <!-- 项目 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项&nbsp;&nbsp;&nbsp;目</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 计划开始时间 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span>计划开始时间</span>
            </div>
            <div class="form-box-item-item">
              <el-date-picker
                size="small"
                clearable
                type="daterange"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <!-- 责任人 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">责任人</span>
            </div>
            <div class="form-box-item-item">
              <el-select size="small" placeholder="请选择里程碑">
                <el-option label="全部" value></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 项目计划名称 -->
        <div class="form-container">
          <div class="form-box-item">
            <div class="form-box-item-label">
              <span class="letterspance2">项目计划名称</span>
            </div>
            <div class="form-box-item-item">
              <el-input
                size="small"
                placeholder="请输入项目计划名称"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="form-container">
          <div class="form-box-item serch-operate" style="width: 200px">
            <el-button
              size="small"
              type="primary"
              @click="refreshList"
              icon="fa fa-search"
              >搜索</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 列表页面 -->
    <div class="table-list-box">
      <div class="customer-title">
        <i class="fa fa-newspaper-o">&nbsp;&nbsp;&nbsp;&nbsp;列表</i>
        <slot name="extra">
          <el-row style="float: right; line-height: 30px">
            <el-button type="primary" icon="el-icon-edit" size="medium" style="margin-right:20px;">新增</el-button>
          </el-row>
        </slot>
      </div>
      <el-table
        v-3clear_scrollBar="'el_table_scroll'"
        :data="tableData"
        style="width: 100%"
        border
        stripe
        :max-height="tableHeight"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              plain
              title="编辑"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              ></el-button
            >
            <el-button size="mini" type="info" plain icon="el-icon-document" title="详情"></el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              title="删除"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              ></el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="padding: 8px 30px 0px 0px; float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import MisManageJs from "./MisManage.js";
export default MisManageJs;
</script>

<style lang="less" scoped>
@import url(./assets/style/style.css);
.seach-container {
  border: 1px solid #d5dde7;
  border-radius: 4px;
  background-color: #fff;
  padding: 8px 8px;
  -webkit-box-shadow: 1px 1px 10px 0px #e5e9f2;
  box-shadow: 1px 1px 8px 0px #e5e9f2;
  height: auto;
  overflow: hidden;
  margin-top: 8px;
  margin-bottom: 8px;
  .customer-title {
    height: 30px;
    padding: 0px;
    line-height: 30px;
    i {
      color: #089680;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .form-container {
    width: 300px;
    margin: 10px;
    float: left;

    .serch-operate .el-button--primary {
      color: #fff;
      background-color: rgb(17, 161, 138);
      border-color: #409eff;
      width: 120px;
      letter-spacing: 3px;
      font-size: 14px;
      padding: 8px 15px !important;
    }
  }
  .form-box-item {
    width: 300px;
    // margin-bottom:10px;
  }
  .form-box-item-label {
    float: left;
    width: 99px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #909399;
    white-space: nowrap;
    border: 1px solid #dcdfe6;
    border-right: 0;
    border-radius: 4px 0px 0px 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    background: #f6f7f9;
  }
  .form-box-item-item {
    margin-left: 100px;
    width: 200px;
    .el-input__inner {
      border-radius: 0 4px 4px 0 !important;
    }
    .el-select,
    .el-input,
    .el-cascader {
      display: block;
      width: 200px;
    }
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 200px;
    }
  }
}

.table-list-box {
  border: 1px solid #d5dde7;
  border-radius: 4px;
  background-color: #fff;
  padding: 8px 8px;
  -webkit-box-shadow: 1px 1px 10px 0px #e5e9f2;
  box-shadow: 1px 1px 8px 0px #e5e9f2;
  position: relative;
  bottom: 0px;
  overflow: hidden;
  .customer-title {
    height: 36px;
    padding: 0px 0px 8px 0px;
    line-height: 36px;
    i {
      color: #089680;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>