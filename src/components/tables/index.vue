<template>
  <div>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="name" width="180" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="description" label="description" width="180" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="director" label="director" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="writer" label="writer" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="range" label="range" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="duration" label="duration" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column prop="releaseCountry" label="releaseCountry" show-overflow-tooltip="">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchMovies } from '@/api/movie'
export default {
  data () {
    return {
      tableData: []
    }
  },
  async created () {
    const res = await fetchMovies()
    this.tableData = res.data.items
    console.log('mock list result------------', res)
  },
  methods: {
  }
}
</script>

<style lang="less">

</style>

