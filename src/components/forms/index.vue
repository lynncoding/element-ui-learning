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
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="age" label="Age" sortable :sort-method=test width="180">
    </el-table-column>
    <el-table-column prop="name" sortable label="Name" width="180">
    </el-table-column>
  </el-table>
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
     tableData: [{
          age: '33%',
          name: 'Tom 3'
        }, {
          age: '7.8%',
          name: 'Tom 2'
        }, {
          age: '44%',
          name: 'Tom 4'
        }, {
          age: '66%',
          name: 'Tom 6'
        }],
      selectedOptions2: []
    }
  },
  methods: {
      formatter(row, column) {
        return row.address + '*';
      },
      test: function(a,b){
        console.log(a.age.slice(0, -1))
        // return parseInt(a.age.split('%')[0]) > parseInt(b.age.split('%')[0]);
        return parseInt(a.age.slice(0, -1)) > parseInt(b.age.slice(0, -1))
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

