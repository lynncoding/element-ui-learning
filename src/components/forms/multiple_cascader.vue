<template>
  <span class="multiple-cascader el-cascader" v-clickoutside="handleClickoutside">
    <el-select @focus="handleFocus" v-model="selectedValues" multiple placeholder="请选择" ref="select" popper-class="multiple-cascader-popper">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-collapse-transition>
      <div v-show="menuVisible" @click="handleClick">
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
            <el-checkbox
            >
              {{thirdLevelNode.label}}
            </el-checkbox>
          </li>
        </ul>
      </div>
    </el-collapse-transition>
  </span>
</template>

<script>
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  export default {
    directives: { Clickoutside },
    props: {
      options: Array,
      values: Array
    },
    data () {
      return {
        selectedValues: [],
        menuVisible: false,
        mounted: false,
        secondLevelNodes: [],
        thirdLevelNodes: [],
        showSecondMenu: false,
        showThirdMenu: false,
        isIndeterminate: false,
        selectOptions: []

      }
    },
    methods: {
      handleClick () {
        this.$refs.select.focus();
      },
      handleFocus() {
        this.menuVisible = true
      },
      handleBlur() {
        this.menuVisible = false
      },
      hoverRootNode (item) {
        this.showSecondMenu = true
        this.secondLevelNodes = item.children
      },
      hoverSecondNode (item) {
        this.showThirdMenu = true
        this.thirdLevelNodes = item.children
      },
      handleClickoutside() {
        this.menuVisible = false;
      }
    },
    watch: {
      menuVisible(value) {
        if(!value) {
          this.showSecondMenu = false
          this.showThirdMenu = false
        }
      },
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
  background-color: #fff;
}
.multiple-cascader {
  display: inline-block;
  position: relative;
  .multiple-cascader-ul {
    margin-top: 10px;
    padding: 0px;
    float: left;
    list-style: none;
    background-color: #fff;
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
