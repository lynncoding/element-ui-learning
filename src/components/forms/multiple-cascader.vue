<template>
  <span class="multiple-cascader">
    <el-select v-model="selectedValues" multiple placeholder="请选择" ref="select" popper-class="multiple-cascader-popper">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-collapse-transition>
      <div v-show="mounted&&$refs.select.visible" @click="stop">
        <ul class="multiple-cascader-ul">
          <li class="multiple-cascader-li" v-for="item in options" :key="item.value" @mouseover="hoverRootNode(item)">
            <el-checkbox :indeterminate="isIndeterminate">{{item.label}}</el-checkbox>
          </li>
        </ul>
        <ul v-show="showSecondMenu" class="multiple-cascader-ul">
          <li class="multiple-cascader-li" v-for="secondLevelNode in secondLevelNodes" :key="secondLevelNode.value" @mouseover="hoverSecondNode(secondLevelNode)">
            <el-checkbox>{{secondLevelNode.label}}</el-checkbox>
          </li>
        </ul>
        <ul v-show="showThirdMenu" class="multiple-cascader-ul">
          <li class="multiple-cascader-li" v-for="thirdLevelNode in thirdLevelNodes" :key="thirdLevelNode.value">
            <el-checkbox :value="checkValue(thirdLevelNode.value)" :label="thirdLevelNode.label">{{thirdLevelNode.label}}</el-checkbox>
          </li>
        </ul>
      </div>
    </el-collapse-transition>
  </span>
</template>

<script>
  // TODO: 监听checkbox的全选半选状态, 第三级节点数据绑定到el-select中
  export default {
    props: {
      options: Array
    },
    data () {
      return {
        selectedValues: [],
        visible: false,
        mounted: false,
        secondLevelNodes: [],
        thirdLevelNodes: [],
        showSecondMenu: false,
        showThirdMenu: false,
        isIndeterminate: false,
        selectOptions: [{
          label: '技能组11',
          value: 3
        }, {
          label: '技能组12',
          value: 4
        }, {
          label: '技能组13',
          value: 5
        }]

      }
    },
    methods: {
      stop () {
        this.$refs.select.visible = true
      },
      hoverRootNode (item) {
        this.showSecondMenu = true
        this.secondLevelNodes = item.children
      },
      hoverSecondNode (item) {
        this.showThirdMenu = true
        this.thirdLevelNodes = item.children
      },
      checkValue (value) {
        console.log(value)
        return !!~this.selectedValues.indexOf(value)
      }
    },
    computed: {
    },
    mounted () {
      this.mounted = true
    }
  }
</script>
<style lang="less">
.multiple-cascader-popper {
  display: none !important;
}
.multiple-cascader {
  .multiple-cascader-ul {
    padding: 0px;
    float: left;
    list-style: none;
    border: 1px solid #e4e8f1;
    width: 150px;
    height: 200px;
  }
  .multiple-cascader-li {
    padding: 0px 10px;
    &:hover {
      background-color:#f5f7fa;
    }
  }
}
</style>
