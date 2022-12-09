<template>
  <el-menu :ellipsis="false" class="el-menu-demo" mode="horizontal">
    <span style="font-family: 华文行楷,serif;font-size: 40px;color: red;margin-top: 9px">淘了个淘！</span>
    <div class="flex-grow"/>
    <el-menu-item index="1">Element Plus</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3">Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>
        <div class="demo-type">
          <el-avatar :size="40" :src="admin.adminPhoto" style="display: flex;">
            <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </div>
      </template>
      <el-menu-item v-if="admin.adminName!==''" index="5-1" style="" @click="exit">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex'
import {toggleDark} from '~/composables';
import {key} from '~/store'
import {getCurrentInstance, reactive, ref} from "vue";
/*引入路由*/
import {useRoute, useRouter} from "vue-router";

/*路由变量*/
const route = useRoute();
const router = useRouter();
const store = useStore(key)

/*引入axios*/
const currentInstance = getCurrentInstance()
const {$http}: any = currentInstance?.appContext.config.globalProperties

const admin = reactive({
  adminId:'',
  adminName: '',
  adminPhoto: '',
  adminSignature: ''
})

const exit = () => {
  admin.adminId = '';
  admin.adminName = '';
  admin.adminPhoto = '';
  admin.adminSignature = '';
  router.push('/Login');
}

const openPrincipal = () => {
  // admin.adminName = '竺九';
  // admin.adminPhoto = 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png';
  // admin.adminSignature = '生活很苦，记得加糖';
  $http.get('http://localhost:8082/user/me'
  ).then((res: any) => {
    console.log("res===" + res.data)
    if (res.data.data === undefined) return
    else {
      admin.adminId = res.data.data.userId;
      admin.adminPhoto = res.data.data.icon;
      admin.adminName = res.data.data.nickName;
    }
  })
}
openPrincipal();

</script>
