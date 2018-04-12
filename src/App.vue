<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" height="100%"><Menu /></el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Menu from './components/menu.vue'
export default {
  components: {
    Menu
  }
}
</script>

<style>

</style>
