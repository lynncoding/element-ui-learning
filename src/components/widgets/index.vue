<template>
  <div class="widgets-wrap">
    <el-cascader
      expand-trigger="hover"
      :options="options"
      :clearable="true"
      :show-all-levels="false"
      v-model="selectedOptions2"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }],
      }],
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>
<style lang="less">
.widgets-wrap {
  margin: 10px;
  background-color: #fff;
}
</style>

