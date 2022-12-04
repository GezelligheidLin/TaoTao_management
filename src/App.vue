<template>
  <el-config-provider namespace="ep">
    <el-container class="layout-container-demo" style="height: 100vh;">
      <el-aside class="el-aside" style="width: auto">
        <el-scrollbar>
          <BaseSide style="height: 100vh"/>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="el-header" style="font-size: 12px;">
          <BaseHeader style="margin-left: -19.8px;height: 100%;width: 100%"/>
        </el-header>
        <el-main class="el-main">
          <el-scrollbar>
            <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite"/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>

  </el-config-provider>
</template>

<script setup lang="ts">
import {ref} from 'vue'

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
