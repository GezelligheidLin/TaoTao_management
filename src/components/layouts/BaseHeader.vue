<template>
  <el-menu :ellipsis="false" class="el-menu-demo" mode="horizontal">
    <span style="font-family: 华文行楷,serif;font-size: 40px;color: red;margin-top: 9px">淘了个淘！</span>
    <div class="flex-grow"/>

    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <div class="demo-type">
          <el-avatar :size="40" :src="admin.adminPhoto" style="display: flex;">
            <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </div>
      </template>
      <el-menu-item v-if="admin.adminName!==''" index="1-1" style="" >
        <span style="font-size: 7px">账户:  {{admin.adminName}}</span>
      </el-menu-item>
      <el-menu-item v-if="admin.adminName!==''" index="1-2" style="" @click="exit">
        <span style="font-size: 12px">登出</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive} from "vue";
import {useStore} from 'vuex'
import {key} from '~/store'
import {toggleDark} from '~/composables';
/*引入路由*/
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
/*路由变量*/
const route = useRoute();
const router = useRouter();
const store = useStore(key)
/*引入axios*/
const currentInstance = getCurrentInstance()
const {$http}: any = currentInstance?.appContext.config.globalProperties
/*定义管理员对象*/
const admin = reactive({
  adminId:'',
  adminName: '',
  adminPhoto: '',
  adminSignature: ''
})
/*登出事件*/
const exit = () => {
  $http.post('http://localhost:8082/admin/logout')
      .then((res:any) => {
        router.push('/Login');
      })
  // admin.adminId = '';
  // admin.adminName = '';
  // admin.adminPhoto = '';
  // admin.adminSignature = '';
}

/*axios请求，进行数据渲染*/
const openPrincipal = () => {

  // admin.adminName = '竺九';
  // admin.adminPhoto = 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png';
  // admin.adminSignature = '生活很苦，记得加糖';
  $http.get('http://localhost:8082/admin/me').then((res: any) => {

    admin.adminId = res.data.data.adminId;
    admin.adminPhoto = res.data.data.adminIcon;
    admin.adminName = res.data.data.realName;
    console.log('adminName:' + admin.adminName);
    ElMessage({
      type: 'success',
      message: '登陆成功，欢迎超级管理员 ' + admin.adminName,
    });

  })

}
openPrincipal();

</script>
