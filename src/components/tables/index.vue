<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="table-items">
          <div class="title">Rowspan</div>
          <div class="content">
            <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
              <el-table-column prop="id" label="ID" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="amount1" label="数值 1（元）">
              </el-table-column>
              <el-table-column prop="amount2" label="数值 2（元）">
              </el-table-column>
              <el-table-column prop="amount3" label="数值 3（元）">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="table-items"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王大虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王大虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王大虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }, {
        id: '12987125',
        name: '王二虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王二虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
 methods:{
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let rowspanArray = [2,3,2]
      let rowspanIndexes = [] //[0, 2, 5]
      console.log(rowspanIndexes);
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          // console.log('row:', rowIndex, 'col:', columnIndex, 'rowspan:', 2)
          //row: 0, col: 1, rowspan: 2
          //row: 2, col: 1, rowspan: 3
          //row: 5, col: 1, rowspan: 2
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 2) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex === 5) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.table-items {
  margin-right: 20px;
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

