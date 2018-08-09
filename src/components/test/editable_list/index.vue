<template>
    <div class="editable-list">
        <div class="list">
            <ul>
                <li :class="{'is-active': index===activeIndex, 'moving-item': true}" :style="{ top: (item.position * 42) + 'px'}" v-for="(item, index) in listData" :key="index" @click="showItem(item, index)">
                    <el-button title="上移一行" :disabled="item.position===0" icon="el-icon-arrow-up" size="mini" @click.stop="moveUp(item, index)" circle></el-button>
                    <el-button title="下移一行" :disabled="item.position===listData.length-1" icon="el-icon-arrow-down" size="mini" @click.stop="moveDown(item, index)" circle></el-button>
                    <span>{{item.position | formatIndex}}</span>
                    <!-- <span>{{item.name}} = {{item.position}}</span> -->
                    <el-button icon="el-icon-close" v-show="item.name" class="list-delete-icon" type="danger" size="mini" @click.stop="deleteItem(item, index)" circle></el-button>
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
// - 未填写完相应表单的项，可删除吗？
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
            // TODO: 根据当前的position,调整数据顺序
            this.$emit('input', this.listData)
        },
        deep: true
        }
    },
    mounted () {
        if (this.value && this.value.length === 0) {
            this.listData = [{name: '', summary: '', weight: '', position: 0}]
        } else {
            this.listData = this.value.map((item, index) => {
            item.position = index
        })
            this.listData = this.value
        }
        this.itemFormData = this.listData[0]
    },

    filters: {
        formatIndex (index) {
            const indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
        '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
        '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十' ]
            return `第${indexMap[index]}项`
        }
    },
    methods: {
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
                        this.listData.push({name: '', summary: '', weight: '', position: this.listData.length})
                        this.activeIndex = this.listData.length - 1
                        this.itemFormData = this.listData[this.activeIndex]
                        this.$refs.itemName.focus()
                    }
                } catch (err) {
                    console.log(err)
                }
            })
        },
        moveUp (item, index) {
            const destination = item.position - 1
            if(destination < 0) {
                return
            }
            let newList = JSON.parse(JSON.stringify(this.listData))
            newList.forEach(qcItem => {
                if(qcItem.position === destination) {
                    qcItem.position = qcItem.position + 1
                }
                if(JSON.stringify(item) === JSON.stringify(qcItem)) {
                    qcItem.position = destination
                }
            })
            this.listData = newList
        },
        moveDown (item, index) {
            const destination = item.position + 1
            if(destination >= this.listData.length) {
                return
            }
            let newList = JSON.parse(JSON.stringify(this.listData))
            newList.forEach(qcItem => {
                if(qcItem.position === destination) {
                    qcItem.position = qcItem.position - 1
                }
                if(JSON.stringify(item) === JSON.stringify(qcItem)) {
                    qcItem.position = destination
                }
            })
            this.listData = newList
        },
        showItem (item, index) {
            // TODO: 切换item时，若有表单未通过验证，如何处理？ 先记住表单未验证的状态
            this.validateItemForm()
            this.$refs.itemName.focus()
            this.activeIndex = index
            this.itemFormData = item
        },
        deleteItem (item, index) {
            // TODO: 删除选中项后，定位到第一项，如果没有数据，打开一个空表单, position要改变
            this.$confirm('删除后无法恢复，你确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let newList = JSON.parse(JSON.stringify(this.listData))
                newList.splice(index, 1)
                newList.forEach(qcItem => {
                    if(qcItem.position > item.position) {
                        qcItem.position = qcItem.position - 1
                    }
                })
                this.listData = newList
                console.log(this.listData)
                // this.activeIndex = item.position
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
<style lang="less">
.editable-list {
    background-color: #fff;
position: relative;
.list {
position: relative;
width: 180px;
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
position: absolute;
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
left: 180px;
width: 600px;
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

