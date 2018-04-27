<template>
  <span
    class="el-cascader"
    :class="[
      {
        'is-opened': menuVisible,
      }
    ]"
    ref="reference"
    @mouseover="menuVisible=true"
    v-clickoutside="handleClickoutside"
  >
    <el-select v-model="selectValues" multiple ref="select" placeholder="请选择关联项目组" popper-class="multiple-cascader-popper">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  <transition name="el-zoom-in-top">
    <div v-show="menuVisible" class="el-cascader-menus el-popper" ref="menuBox">
      <ul class="el-cascader-menu">
        <li class="el-cascader-menu__item" v-for="option in options" :key="option.value" @mouseover="showSecondUl(option)">
          <el-checkbox :indeterminate="option.indeterminate" :label="option.value" v-model="option.checked" :ref="option.value">{{option.label}}</el-checkbox>
        </li>
      </ul>
      <ul class="el-cascader-menu" v-show="showSecondMenu">
        <li class="el-cascader-menu__item" v-for="option in secondOptions" :key="option.value" @mouseover="showThirdUl(option)">
          <el-checkbox :label="option.value" :ref="option.value">{{option.label}}</el-checkbox>
        </li>
      </ul>
      <ul class="el-cascader-menu" v-show="showThirdMenu">
        <li class="el-cascader-menu__item" v-for="option in thirdOptions" :key="option.value">
          <el-checkbox @input="check(option)" :label="option.value" :ref="option.value">{{option.label}}</el-checkbox>
        </li>
      </ul>
    </div>
  </transition>
  </span>
</template>

<script>
import CascaderMenu from './menu';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { generateId } from 'element-ui/src/utils/util';

export default {
  name: 'ElCascader',

  directives: { Clickoutside },
  props: {
    options: {
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        };
      }
    },
    values: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
  },
  data () {
    return {
      value: [],
      menuVisible: false,
      selectOptions: [],
      selectValues: [],
      secondOptions: [],
      thirdOptions: [],
      showSecondMenu: false,
      showThirdMenu: false
    }
  },
  watch: {
    values: {
      immediate: true,
      handler (n) {
        this.selectValues = this.values ? [].concat(this.values) : []
      }
    }
  },

  methods: {
    handleClickoutside () {
      this.menuVisible = false
    },
    showSecondUl (option) {
      if(option.children) {
        this.secondOptions = option.children
        this.showSecondMenu = true
      }
    },
    showThirdUl (option) {
      if(option.children) {
        this.selectOptions = option.children
        this.thirdOptions = option.children
        this.showThirdMenu = true
      }
    },
    check (node) {
      debugger //eslint-disable-line
      let index = this.selectValues.indexOf(node.value)
      if (index > 0) {
        this.selectValues.splice(index, 1)
      } else {
        console.log(this.selectOptions);
        this.selectValues.push(node.value)
      }
    }
  }
}
</script>

<style lang="less">
.multiple-cascader-popper {
  display: none;
}
</style>
