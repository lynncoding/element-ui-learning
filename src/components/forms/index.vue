<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="form-items">
          <div class="title">multiple Cascader</div>
          <div class="content">
            <multiple-cascader :options="options" :values="values"></multiple-cascader></br>
            <!-- <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2">
            </el-cascader> -->
            <!-- <el-cascader-modified
              :options="options"
              :show-all-levels="false"
              expand-trigger="hover"
              change-on-select
              v-model="val"
              multiple
              show-values
            ></el-cascader-modified> -->
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="form-items"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import multipleCascader from './multiple-cascader/main.vue'
import ElCascader from './el-cascader/main'
export default {
  components: {
    multipleCascader,
    ElCascader
  },
  data () {
    return {
      val: [],
      values: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        checked: false,
        indeterminate: false,
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          checked: false,
          indeterminate: false,
          children: [{
            value: 'yizhi',
            label: '一致',
            checked: false,
            indeterminate: false,
          }, {
            value: 'fankui',
            checked: false,
            indeterminate: false,
            label: '反馈'
          }, {
            value: 'xiaolv',
            checked: false,
            indeterminate: false,
            label: '效率'
          }, {
            value: 'kekong',
            checked: false,
            indeterminate: false,
            label: '可控'
          }]
        }, {
          value: 'kaifazhinan',
          checked: false,
          indeterminate: false,
          label: '开发指南',
          children: [{
            value: 'anzhuang',
            checked: false,
            indeterminate: false,
            label: '安装'
          }, {
            value: 'guojihua',
            checked: false,
            indeterminate: false,
            label: '国际化'
          }]
        }]
      }],
      selectedOptions2: []
    }
  }
}
</script>

<style lang="less">
.form-items {
  margin-right: 20px;
  height: 350px;
  background-color: #fff;
}
.title {
  padding: 20px;
  background-color: #9cc96b;
  color: #fff;
}
.content {
  padding: 10px;
}
</style>

