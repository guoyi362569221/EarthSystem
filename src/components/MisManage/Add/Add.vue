<template>
  <div>
    <div class="modulebox">
      <div class="modulebox-title-search fn-clear">
        <div class="fn-inline modulebox-title fn-inline">
          <EpTitle>新增</EpTitle>
        </div>
        <div class="modulebox-option fn-inline">
          <EpButton ico="back" type="primary" @click="onBackClick">返回</EpButton>
        </div>
      </div>
      <div class="detailcon">
        <div class="margint20">
          <div>
            <table class="ditail-table">
              <!-- <colgroup width="25%" span="2" align="right" class="table-label-bgcolor"></colgroup> -->
              <colgroup>
                <col width="20%" span class="table-label-bgcolor right">
                <col width="30%" span="1">
                <col width="20%" span class="table-label-bgcolor right">
                <col width="30%" span="1">
              </colgroup>
              <tr>
                <td class="right"><div class="tablecell">车辆识别码</div></td>
                <td class>
                  <Input v-model="value" placeholder="请输入车辆识别码" />
                </td>
                <td class="right" rowspan="3"><div class="tablecell">车辆照片</div></td>
                <td class rowspan="3">
                  
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">车龄</div></td>
                <td class>
                  <Input v-model="value" placeholder="请输入车龄" />
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">最后检测时间</div></td>
                <td class>
                  <DatePicker type="date" placeholder="请输入最后检测时间" />
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">行政区划</div></td>
                <td colspan="3">
                  <div class="scope-select">
                    <div class="fn-inline scope-select-left">
                      <span class="fn-inline">请选择行政区划</span>
                    </div>
                    <div class="fn-inline scope-select-right">
                      <label class="fn-inline">快速选择：</label>
                      <a class="fn-inline" @click="selectAllDept">所有部门</a>
                      <i class="fn-inline fgx"></i>
                      <a class="fn-inline">我的部门</a>
                    </div>
                  </div>
                  <EpSelectDept
                    :multiple="true"
                    :tree-data="treeDataList"
                    :visible="showAllDeptSelect"
                    @update:visible="showAllDeptSelect = false"
                    @on-save="saveSelectDeptData"
                  >
                    <EpButton type="primary" btnclass="margin0">职能部门</EpButton>
                    <EpButton type="gray" btnclass="margin-left20">环保厅</EpButton>
                  </EpSelectDept>
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">列入原因</div></td>
                <td colspan="3">
                  <Select v-model="model1" clearable>
                    <Option
                      v-for="item in typesOfIndustris"
                      :key="item.value"
                      :value="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">报告附件</div></td>
                <td colspan="3">
                  <EpUploadPagesPreview
                    show-preview-btn="true"
                    size="12k"
                    type="excel"
                    @onPreviewClick="onPreviewClick"
                  >EpUploadPagesPreview.excel</EpUploadPagesPreview>
                </td>
              </tr>
              <tr>
                <td class="right"><div class="tablecell">备注</div></td>
                <td colspan="3">
                  <Input
                    v-model="value6"
                    type="textarea"
                    :rows="rows"
                    placeholder="请输入备注"
                  />
                </td>
              </tr>
            </table>
            <div class="magintop45 center">
              <EpButton type="primary">上报</EpButton>
              <EpButton btnclass="marginl36" type="error">暂存</EpButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoveVehBlcakAdd',
  components: {},
  data() {
    return {
      value6: '',
      rows: 5,
      tabIndex: 0,
      picterObj: {
        src: require('@/assets/img/target/f1.jpg'),
        name: ''
      },
      showAllDeptSelect: false,
      treeDataList: [
        {
          title: 'parent 1',
          expand: true,
          selected: false,
          children: [
            {
              title: 'parent 1-1',
              expand: false,
              children: [
                {
                  title: 'leaf 1-1-1',
                  disabled: false
                },
                {
                  title: 'leaf 1-1-2',
                  children: [
                    {
                      title: 'leaf 1-1-2-1',
                      disabled: false
                    },
                    {
                      title: 'leaf 1-1-2-2'
                    }
                  ]
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: false,
              children: [
                {
                  title: 'leaf 1-2-1',
                  checked: true
                },
                {
                  title: 'leaf 1-2-2'
                }
              ]
            }
          ]
        }
      ],
      model1: '',
      typesOfIndustris: [
        {
          value: '过期未检',
          label: '过期未检'
        },
        {
          value: '排放超标',
          label: '排放超标'
        },
        {
          value: '其他',
          label: '其他'
        }
      ]
    }
  },
  methods: {
    onBackClick() {
      let crumbsData = this.$store.getters.getCrumbsData
      crumbsData.pop()
      this.$store.commit('setCrumbsData', crumbsData)
      this.$router.go(-1)
    },
    onTabClick(index) {
      this.tabIndex = index
    },
    onPreviewClick() {},
    selectAllDept() {
      this.showAllDeptSelect = true
    },
    saveSelectDeptData(data) {
      console.log(data)
    }
  },
  mounted() {}
}
</script>
<style scoped lang="scss">
.ivu-input-type-textarea textarea {
  min-height: 132px;
}
</style>
