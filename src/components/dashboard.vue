<template>
  <div class="hello">
    <el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
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
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      tableData6: [{
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
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let rowspanArray = [2, 3, 2]
      let preIndex = 0
      let rowindexArray = [] // 0, 2, 5
      var result = null
      rowspanArray.forEach(item => {
        rowindexArray.push(preIndex)
        preIndex = preIndex + item
      })
      if(columnIndex === 1) {
        rowindexArray.forEach((item, i) => {
            if(rowIndex === item) {
              result = {
                rowspan: rowspanArray[i],
                colspan: 1
              }
            } else {
              result = {
                rowspan: 0,
                colspan: 0
              }
            }
        })
      }
      return result
    }
  },
  computed: {
    getRowspanIndex: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
