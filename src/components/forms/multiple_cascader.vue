<template>
  <span class="multiple-cascader el-cascader" v-clickoutside="handleClickoutside">
    <el-select @focus="handleFocus" v-model="selectValues" multiple ref="select" :placeholder="placeholder" popper-class="multiple-cascader-popper">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-collapse-transition class="multiple-cascader-menus">
      <div v-show="menuVisible" @click="handleClick">
        <div v-if="options&&options.length>0">
          <ul class="multiple-cascader-ul">
            <li class="multiple-cascader-li" v-for="item in options" :key="item.value" @mouseover="hoverRootNode(item)">
              <el-checkbox :indeterminate="isIndeterminate" @change="changeCheckbox">{{item.label}}</el-checkbox>
            </li>
          </ul>
          <ul v-show="showSecondMenu" class="multiple-cascader-ul">
            <el-checkbox-group v-model="secondCheckedValues">
            <li class="multiple-cascader-li" v-for="secondLevelNode in secondLevelNodes" :key="secondLevelNode.value" @mouseover="hoverSecondNode(secondLevelNode)">
              <el-checkbox :label="secondLevelNode.value" :ref="secondLevelNode.value">{{secondLevelNode.label}}</el-checkbox>
            </li>
            </el-checkbox-group>
          </ul>
          <ul v-show="showThirdMenu" class="multiple-cascader-ul">
            <el-checkbox-group v-model="thirdCheckedValues">
            <li class="multiple-cascader-li" v-for="thirdLevelNode in thirdLevelNodes" :key="thirdLevelNode.value">
              <el-checkbox
                @input="check(thirdLevelNode)"
                :label="thirdLevelNode.value"
              >
                {{thirdLevelNode.label}}
              </el-checkbox>
            </li>
            </el-checkbox-group>
          </ul>
        </div>
        <div class="empty-panel" v-else>没有数据</div>
      </div>
    </el-collapse-transition>
  </span>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
    directives: { Clickoutside },
    props: {
      options: Array,
      values: {
        type: Array,
        default () {
          return []
        }
      },
      placeholder: {
        type: String,
        default () {
          return '请选择'
        }
      }
    },
    data () {
      return {
        secondCheckedValues: [],
        thirdCheckedValues: [],
        selectValues: [],
        selectOptions: [{
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }],
        menuVisible: false,
        mounted: false,
        secondLevelNodes: [],
        thirdLevelNodes: [],
        showSecondMenu: false,
        showThirdMenu: false,
        isIndeterminate: false
      }
    },
    watch: {
      values: {
        immediate: true,
        handler (n) {
          this.selectValues = this.values ? [].concat(this.values) : []
        }
      },
      menuVisible (value) {
        if (!value) {
          this.showSecondMenu = false
          this.showThirdMenu = false
        }
      }
    },
    methods: {
      $getValue () {
        return this.myValue
      },
      handleClick () {
        this.$refs.select.focus()
      },
      handleFocus () {
        this.menuVisible = true
      },
      handleBlur () {
        this.menuVisible = false
      },
      hoverRootNode (item) {
        let options = this.options
        this.showSecondMenu = true
        this.secondLevelNodes = item.children
      },
      hoverSecondNode (item) {
        this.showThirdMenu = true
        this.thirdLevelNodes = item.children
        this.selectOptions = item.children
      },
      handleClickoutside () {
        this.menuVisible = false
      },
      checkValue (value) {
        return !!~this.selectValues.indexOf(value)
      },
      check (node) {
        let index = this.selectValues.indexOf(node.value)
        if (~index) {
          this.selectValues.splice(index, 1)
        } else {
          this.selectValues.push(node.value)
        }
      },
      changeCheckbox (val, e) {
        // debugger
        let options = this.options
        let secondCheckedValues = []
        let thirdCheckedValues = []
        this.options[0].children.forEach((item) => {
          secondCheckedValues.push(item.value)
          item.children.forEach((leafItem) => {
            thirdCheckedValues.push(leafItem.value)
          })

        })
        //TODO: 更新checkbox本身的indeterminate，以及子节点对应的checkbox选中状态
        this.isIndeterminate = false
        if(val) {
          this.secondCheckedValues = secondCheckedValues
          this.thirdCheckedValues = thirdCheckedValues
          thirdCheckedValues.forEach((value) => {
            if(this.selectValues.indexOf(value) < 0) {
              this.selectValues.push(value)
            }
          })
        } else {
          this.secondCheckedValues = []
          this.thirdCheckedValues = []
        }
      }
    },
    computed: {
    },
    mounted () {
      let a = this.menuVisible
      this.mounted = true
    }
  }
</script>
<style lang="less">
.multiple-cascader-popper {
  display: none;
  background-color: #fff;
}
.menu-item {
  margin-top: 10px;
  padding: 0px;
  float: left;
  list-style: none;
  background-color: #fff;
  border: 1px solid #e4e8f1;
  width: 150px;
  height: 200px;
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
  .empty-panel {
    background-color: #fff;
    border: 1px solid #e4e8f1;
    width: 150px;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    color: #c0c4cc;
  }
}
</style>
