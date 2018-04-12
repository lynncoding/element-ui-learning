<template>
<div class="menu">
  <div class="logo">Elment-UI</div>
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#32404e"
    text-color="#adb3b8"
    active-text-color="#ffd04b">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">Profile</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">Pages</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">Forms</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">Tables</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 250px;
  height: 65px;
  background-color: #409eff;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>
