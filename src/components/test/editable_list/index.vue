<template>
    <div class="editable-list">
        <div class="list">
            <ul>
                <li :class="{'is-active': item.isActive}" v-for="(item, index) in listData" :key="index" @click="showItem(item, index)">
                    <el-button title="上移一行" :disabled="index===0" icon="el-icon-arrow-up" size="mini" @click.stop="moveUp(item, index)" circle></el-button>
                    <el-button title="下移一行" :disabled="index===listData.length-1" icon="el-icon-arrow-down" size="mini" @click.stop="moveDown(item, index)" circle></el-button>
                    <span>{{item.name || '请输入...'}}</span>
                    <el-button icon="el-icon-close" class="list-delete-icon" type="danger" size="mini" @click.stop="deleteItem(item, index)" circle></el-button>
                </li>
            </ul>
        <div class="bottom-bar" :class="{'is-disabled': listData.length>=maxLength }" @click="addItem"><i class="el-icon-plus"></i>添加质检项</div>
        </div>
        <div class="form-wrapper">
            <el-form :model="itemFormData" ref="qcItemform" :rules="rules" label-width="120px" label-position="right">
                <el-form-item label="质检项名称" prop="name">
                    <el-input ref="itemName" placeholder="请输入质检项名称" autofocus v-model="itemFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="质检标准" prop="summary">
                    <el-input placeholder="请输入质检标准" v-model="itemFormData.summary"></el-input>
                    <!-- <jw-count-input :count="200" v-model="itemFormData.summary" :width="350" :height="88" errMsg="最多不能超过200个字符"></jw-count-input> -->
                </el-form-item>
                <el-form-item label="分值" prop="weight" v-if="showScore">
                    <el-input width="200px" type="number" :min="1" placeholder="请输入分值" v-model="itemFormData.weight"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
// TODO:
// 表单验证：未通过验证切换质检项
// 删除： 动画效果
// "预览模版"按钮 未 通过验证，
// 除了“切换”item外， 其它组件的交互，都需当前的form通过验证才能继续
// 点击“完成” 如果有为通过验证的表单，则定位到该表单，提示验证信息
export default {
  props: {
    showScore: {
      type: Boolean,
      default: true
    },
    maxLength: Number,
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    let validateScore = (rule, value, callback) => {
      if (value && (Number(value) > 100 || Number(value) < 1)) {
        return callback(new Error('输入不符合规则！'))
      } else {
        callback()
      }
    }
    return {
      showCloseBtn: true,
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { max: 50, message: '字数超限!', trigger: 'change' }
        ],
        summary: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { max: 200, message: '字数超限!', trigger: 'change' }
        ],
        weight: [
          { validator: validateScore, trigger: 'blur' },
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      sortedList: [],
      listData: [],
      activeIndex: 0,
      isFormValid: false,
      itemFormData: {
        name: '',
        summary: '',
        weight: ''
      }
    }
  },
  watch: {
    listData: {
      handler (value) {
        let finalList = JSON.parse(JSON.stringify(this.listData))
        finalList.map(item => {
          delete item['isValid']
        })
        this.$emit('input', finalList)
      },
      deep: true
    }
  },
  mounted () {
    if (this.value && this.value.length === 0) {
      this.listData = [{name: '', summary: '', weight: '', isActive: true, isValid: true}]
    } else {
      this.listData = this.value.map((item, index) => {
        item.isValid = index
        item.isActive = false

      })
      this.listData = this.value
    }
    this.listData[0].isActive = true
    this.itemFormData = this.listData[0]
  },

  methods: {
    setInitItem () {
      if(this.listData.length === 0) {
        this.listData.push({name: '', summary: '', weight: '', isActive: true, isValid: true})
        this.$refs.itemName.focus()
        this.$refs.qcItemform.resetFields()
      }
    },
    setActiveItem (activeIndex) {
      if(this.listData.length > 0) {
        this.listData.map((item, index) => {
          if(activeIndex === index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
          this.itemFormData = this.listData[activeIndex]
        })
      } else {
        this.setInitItem()
      }
    },
    validateItemForm () {
      // 切换质检项，表单被重新填值，如果切换前的质检项有空值，将表单状态标记为验证失败
      const hasNullProp = this.listData.some(item => !item.name || !item.summary || !item.weight)
      this.isFormValid = !hasNullProp
    },
    isValid () {
      let isValid = false
      this.$refs.qcItemform.validate(valid => {
        isValid = valid
      })
      return this.isFormValid && isValid
    },
    addItem () {
      if (this.listData.length >= this.maxLength) {
        return
      }
      this.$refs.qcItemform.validate(valid => {
        try {
          if (valid) {
            this.listData.push({name: '', summary: '', weight: '', isActive: true, isValid: false})
            this.setActiveItem(this.listData.length - 1)
            this.$refs.itemName.focus()
          }
        } catch (err) {
          console.log(err)
        }
      })
    },
    moveUp (item, index) {
      this.$refs.qcItemform.validate(valid => {
        try {
          if (valid) {
            this.listData.splice(index, 1)
            if (index - 1 >= 0) {
              this.listData.splice(index - 1, 0, item)
            }
          }
        } catch (err) {
          console.log(err)
        }
      })
    },
    moveDown (item, index) {
      this.$refs.qcItemform.validate(valid => {
        try {
          if (valid) {
            this.listData.splice(index, 1)
            this.listData.splice(index + 1, 0, item)
          }
        } catch (err) {
          console.log(err)
        }
      })
    },
    showItem (item, index) {
      // TODO: 切换item时，若有表单未通过验证，如何处理？ 先记住表单未验证的状态
      // this.validateItemForm()
      this.$refs.itemName.focus()
      this.setActiveItem(index)
      this.$refs.qcItemform.validate(valid => {
        try {
          if (valid) {
            this.$refs.qcItemform.clearValidate()
          }
        } catch (err) {
          console.log(err)
        }
      })
    },
    resetForm () {
      this.listData.push({name: '', summary: '', weight: '', isValid: true})
      this.activeIndex = this.listData.length - 1
      this.itemFormData = this.listData[this.activeIndex]
      this.$refs.itemName.focus()
    },
    deleteItem (item, index) {
      this.$confirm('删除后无法恢复，你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listData.splice(index, 1)
        this.setActiveItem(index - 1 > 0 ? index - 1 : 0)
        this.$message({
          type: 'success',
          duration: 1000,
          message: '移除成功!'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .editable-list {
      background-color: #fff;
      position: relative;
  .list {
    position: relative;
    width: 400px;
    height: 380px;
    border: 1px solid #dcdfe6;
  }
  ul {
    position: relative;
    margin: 0px;
    padding: 0px;
    height: calc(~"100% - 40px");
    overflow-y: auto;
  }
  ul li {
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    margin: 0px;
    list-style: none;
    padding: 10px;
    border-bottom: 1px solid #dcdfe6;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    &:hover .list-delete-icon {
      display: inline-block;
    }
    &.is-active {
      background-color: #f5f7fa;
    }
    .el-button + .el-button {
      margin-left: 5px;
    }
    .el-button + span {
      margin: 0px 5px;
    }
  }
  .moving-item {
    transition: all 1s ease;
    -webkit-transition: all 1s ease;
  }
  .el-button--mini.is-circle {
    padding: 2px;
  }
  .list-delete-icon {
    display: none;
    float: right;
  }
  .bottom-bar {
    cursor: pointer;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #dcdfe6;
    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
    }
    i {
      font-weight: bold;
      padding-right: 5px;
    }
  }
  .form-wrapper {
    position: absolute;
    box-sizing: border-box;
    top: 0px;
    left: 400px;
    width: 520px;
    height: 382px;
    padding: 30px 20px;
    border: 1px solid #dcdfe6;
    border-left: none;
    .el-input {
      width: 350px;
    }
  }
  .mr10 {
    margin-right: 10px;
  }
}
</style>

