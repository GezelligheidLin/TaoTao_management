<template>

  <el-menu
      default-active="2"
      :collapse-transition="true"
      class="el-menu-vertical-demo"
      :collapse="value"
      router
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index='/Principal' @click="value=!value">
      <el-icon>
        <Plus v-if="value===true"/>
        <Minus v-if="value===false"/>
      </el-icon>
      <template #title>
        <span v-if="value===false">turn off</span>
        <span v-if="value===true">turn on</span>
      </template>
    </el-menu-item>
    <el-menu-item :index=jump[0]>
      <el-icon><Avatar /></el-icon>
      <template #title><span>管理员控制面板</span></template>
    </el-menu-item>
    <el-menu-item :index=jump[1]>
      <el-icon><UserFilled /></el-icon>
      <template #title><span>商家控制面板</span></template>
    </el-menu-item>
    <el-menu-item :index=jump[2]>
      <el-icon><User /></el-icon>
      <template #title>用户控制面板</template>
    </el-menu-item>
  </el-menu>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Minus, Plus,} from '@element-plus/icons-vue'
//引入vuex存储
import {key} from '~/store'
import {useStore} from "vuex";

const store = useStore(key)

/*侧边栏路由跳转的数组*/
const jump = ['/Principal/adminControlPanel','/Principal/merchantControlPanel','/Principal/userControlPanel']
/*侧边栏展开的标识*/
const value = ref(true);
/*判断侧边栏是否展开*/
const isCollapse = () => {
  return value.value;
};
/*组件的东西*/
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
