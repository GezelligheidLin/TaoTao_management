<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      v-bind:collapse="isCollapse()"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="1" @click="value=!value">
      <el-icon>
        <Plus v-if="value===true"/>
        <Minus v-if="value===false"/>
      </el-icon>
      <template #title>
        <span v-if="value===false">turn off</span>
        <span v-if="value===true">turn on</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location/>
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <document/>
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>

</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {Location, Document, Menu as IconMenu, Setting, Plus, Minus,} from '@element-plus/icons-vue'
//引入vuex存储
import {key} from '~/store'
const store = useStore(key)
import {useStore} from "vuex";
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

