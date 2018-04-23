<template>
<div class="menu">
  <div class="logo">Elment-UI Learning</div>
  <el-menu
    router
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#32404e"
    text-color="#adb3b8"
    active-text-color="#ffd04b">
    <el-menu-item index="dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="profile">
      <i class="el-icon-menu"></i>
      <span slot="title">Profile</span>
    </el-menu-item>
    <el-menu-item index="pages">
      <i class="el-icon-document"></i>
      <span slot="title">Pages</span>
    </el-menu-item>
    <el-menu-item index="forms">
      <i class="el-icon-setting"></i>
      <span slot="title">Forms</span>
    </el-menu-item>
    <el-menu-item index="tables">
      <i class="el-icon-setting"></i>
      <span slot="title">Tables</span>
    </el-menu-item>
    <el-menu-item index="widgets">
      <i class="el-icon-setting"></i>
      <span slot="title">Widgets</span>
    </el-menu-item>
    <el-menu-item index="test">
      <i class="el-icon-setting"></i>
      <span slot="title">Test</span>
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
.menu {
  height: 100%;
  width: 250px;
  background-color: rgb(50, 64, 78);
}
.logo {
  width: 250px;
  background-color: #409eff;
  color: #fff;
  text-align: center;
  font-size: 16px;
  padding: 22px 0px;
}
</style>
