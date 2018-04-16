<template>
  <div id="app" style="height:100%">
    <el-container>
      <el-aside width="250px" height="100%"><Menu /></el-aside>
      <el-container>
        <el-header><Header /></el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Menu from './components/menu.vue'
import Header from './components/header.vue'
export default {
  components: {
    Menu,
    Header
  }
}
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  height: 65px !important;
}
.el-main {
  background-color: rgb(246, 246, 246);
}
</style>
