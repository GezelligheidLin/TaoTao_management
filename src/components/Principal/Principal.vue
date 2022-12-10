<template>
  <el-config-provider namespace="el"><!--自定义的命名空间样式与elementPlus的部分样式有冲突-->
    <el-container class="layout-container-demo" style="height: 100vh">
      <el-aside class="el-aside" className="el-aside" style="width: auto">
        <el-scrollbar>
          <BaseSide style="height: 100vh"/>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="el-header" className="el-header" style="font-size: 12px;">
          <BaseHeader style="margin-left: -19.8px;height: 100%;width: 100%"/>
        </el-header>
        <el-main class="el-main" className="el-main">
          <el-scrollbar>
            <router-view/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">

/*进入页面自动进行一次刷新事件*/
const f5 = () => {
  if (location.href.indexOf("#reloaded") == -1) {
    location.href = location.href + "#reloaded";
    location.reload();
  }
}
f5();
</script>

<style scoped>

/*.layout-container-demo .el-header {*/
/*  position: relative;*/

/*  color: var(--el-text-color-primary);*/
/*}*/
/*.layout-container-demo .el-aside {*/
/*  color: var(--el-text-color-primary);*/

/*}*/
/*.layout-container-demo .el-menu {*/
/*  border-right: none;*/
/*}*/
/*.layout-container-demo .el-main {*/
/*  padding: 0;*/
/*}*/
/*.layout-container-demo .toolbar {*/
/*  display: inline-flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  height: 100%;*/
/*  right: 20px;*/
/*}*/
</style>
