<template>
  <div style="position: absolute;right:3%;top: 30px;width: 200px">
  <el-input
      v-model="searchValue"
      class="w-50 m-2"
      placeholder="Please Input"
      :suffix-icon="Search"
  />
  </div>
  <div style="position: absolute;top: 40px;left: 20px">
    <el-button
        type="primary"
        link
        @click="dialogFormVisible = true"
        :style="{boxShadow:'var(--el-box-shadow)'}"
    >注册管理员</el-button>
  </div>
  <div>
    <el-drawer
        ref="drawerRef"
        v-model="dialogFormVisible"

        :before-close="handleClose"
        direction="rtl"
        class="demo-drawer"
    >
    <div style="width: 400px;margin: auto">
      <span v-if="isPassWord" style="color: #589ef8;font-size: 14px;position: absolute;top: 15px;left: 20px">密码注册</span>
      <span v-if="isPassWord===false" style="color: #589ef8;font-size: 14px;position: absolute;top: 15px;left: 20px">短信注册</span>
      <el-form
          label-position="top"
          :model="adminForm"
          status-icon
          label-width="78px"
          class="demo-ruleForm"
          style=""
      >
        <el-form-item prop="phone" show-message>
          <template #label>
            <span style="color: #589ef8">phone</span>
          </template>
          <el-input
              v-model="adminForm.phone"
              autocomplete="off"
          />
          <span v-if="isClickSubmitPhone" style="color: #589ef8;position: absolute;margin-top: 60px;right: 0">please input phone</span>
        </el-form-item>
        <el-form-item v-if="isPassWord===false" prop="code" style="width: 200px">
          <template #label>
            <span style="color: #589ef8">code</span>
          </template>
          <el-input
              v-model="adminForm.code"
              autocomplete="off"
              style="float: left"
          />
          <el-button plain style="color: #589ef8;position: absolute;right: -100%" @click="sendCode">Send Code</el-button>
          <span v-if="isClickSubmitCode" style="color: #589ef8;position: absolute;margin-top: 60px;right: 0">please input code</span>
        </el-form-item>
        <el-form-item v-if="isPassWord" prop="password" >
          <template #label>
            <span style="color: #589ef8">password</span>
          </template>
          <el-input
              v-model="adminForm.password"
              type="password"
              autocomplete="off"
          />
          <span v-if="isClickSubmitPassWord" style="color: #589ef8;position: absolute;margin-top: 60px;right: 0">please input password</span>
        </el-form-item>
        <el-form-item style="margin-top: 40px;margin-left: 27px">
          <el-button type="primary" @click="submitForm()" style="width: 107px"
          >Resister
          </el-button
          >
          <el-button @click="resetForm()"
                     style="margin-left: 120px;width: 110px"
          >Reset</el-button>
        </el-form-item>
      </el-form>
      <el-button v-if="isPassWord===false" plain @click="PassWordLogin" style="position: absolute;background: transparent;border: 0;color: #589ef8;font-size: 10px;right:0">Switch to password login</el-button>
      <el-button v-if="isPassWord" plain @click="PassWordLogin" style="position: absolute;background: transparent;border: 0;color: #589ef8;font-size: 10px;right:0">Switch to code login</el-button>
    </div>
    </el-drawer>
  </div>
  <div style="margin-top: 100px;margin-left: 20px">
  <el-table :data="tableData" height="740" size="large" current-row-key="1" style="width: 1790px">
    <el-table-column align="center" fixed  prop="phone" label="phone" width="200" />
    <el-table-column align="center" prop="realName" label="realName" width="200" />
    <el-table-column align="center"  label="adminIcon" width="270" >
      <template #default="scope">
        <div style="display: flex;margin: auto;width: 120px">
          <el-image :src="scope.row.adminIcon" />
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="sex" label="sex" width="200" />
    <el-table-column align="center" prop="status" label="status" width="200" />
    <el-table-column align="center" prop="isRoot" label="isRoot" width="200" />
    <el-table-column align="center" prop="createTime"  width="200" >
      <template #header>
        <span>createTime</span>
        <el-icon><SortUp /></el-icon>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="updateTime" label="updateTime" width="200" />
    <el-table-column align="center" fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
        >禁用</el-button
        >
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div style="margin-top: 30px;">
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
        style="position: absolute; left: 50%;transform: translate(-50%);"
    />
  </div>
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, reactive, ref} from "vue";
import {ElDrawer, ElMessage, ElMessageBox, ElNotification} from 'element-plus'
/*引入路由*/
import {useRoute, useRouter} from "vue-router";
/*路由变量*/
const route = useRoute();
const router = useRouter();
/*引入axios*/
const currentInstance = getCurrentInstance()
const {$http}: any = currentInstance?.appContext.config.globalProperties
const centerDialogVisible = ref(false)
/*创建admin对象*/
const adminForm = reactive({phone:'',code:'',password:'',isRoot:''})
/*判断是密码登陆还是手机号登陆的标识*/
const isPassWord = ref(false);
/*判断是否点了登陆后有没填的选项标识*/
const isClickSubmitPhone = ref(false)
const isClickSubmitCode = ref(false)
const isClickSubmitPassWord = ref(false)
/*抽屉是否开启的标识*/
const dialogFormVisible = ref(false)
/*搜索框值的绑定*/
const searchValue = ref('');
/*定义倒计时初始值*/
const count = ref(3);
const loading = ref(false)
let timer;
const close = ref(false)

/*睡眠函数*/
const sleep = (millisecond:number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}
/*点击使用密码登陆的函数*/
const PassWordLogin = async () => {
  await sleep(500);
  isPassWord.value = !isPassWord.value;
  isClickSubmitPhone.value=false;
  isClickSubmitCode.value=false;
  isClickSubmitPassWord.value=false;
}
/*注册是否成功提示框*/
const hint = (msg:any,type:any) => {
  ElMessage({
    type: type,
    message: msg,
  })
}
/*验证码提示框*/
const codeHint = (title:any,message:any,type:any) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
  })
}
/*注册抽屉不聚焦时的事件*/
const handleClose = (done:any) => {
  if (loading.value) {
    return
  }
  if(close.value===false) {
    ElMessageBox.confirm('确定关闭嘛,您的数据尚未提交')
        .then(() => {
          loading.value = true
          timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              loading.value = false
            }, 400)
          }, 2000)
        })
  }else{
    done()
    close.value=false;
  }
}
/*发送验证码事件*/
const sendCode = () => {
  /*axios发送请求并将手机传给后端获取验证码*/
  $http.get('http://localhost:8082/admin/code/' + adminForm.phone)
      .then((res:any)=>{
        console.log(res)
        if(res.data.success){
          codeHint('Success','验证码发送成功','success');
        }else{
          codeHint('Error',res.data.errorMsg,'error');
        }
      });
}
/*点击注册的事件*/
const submitForm = () => {
  if(!isPassWord.value){
    if (adminForm.phone==='') {
      isClickSubmitPhone.value=true;
      isClickSubmitCode.value=false;
    }
    else if(adminForm.code==='') {
      isClickSubmitPhone.value=false;
      isClickSubmitCode.value=true;
    }
    else{
      isClickSubmitPhone.value=false;
      isClickSubmitCode.value=false;
    }
  }else{
    if (adminForm.phone==='') {
      isClickSubmitPhone.value=true;
      isClickSubmitCode.value=false;
    }
    else if(adminForm.password==='') {
      isClickSubmitPhone.value=false;
      isClickSubmitPassWord.value=true;
    }
    else{
      isClickSubmitPhone.value=false;
      isClickSubmitPassWord.value=false;
    }
  }
  $http.post('http://localhost:8082/admin/register/', adminForm).then(async (res: any) => {//发送axios请求并将登陆对象传递给后端
    console.log(res)
    if (res.data.success) {
        await sleep(900);
        hint(res.data.data,'success');
        close.value=true;
      }else{
        hint(res.data.errorMsg,'error')
      }
  })
}
/*点击重置的事件*/
const resetForm = async () => {
  await sleep(500);
  isClickSubmitPhone.value = false;
  isClickSubmitCode.value = false;
  isClickSubmitPassWord.value = false;
  adminForm.code = '';
  adminForm.phone = '';
  adminForm.password = '';
}
/*禁用的事件*/
const handleClick = () => {
  console.log('click')
}
/*进入admin子页面时获取是否为超级管理员*/
const openAdmin = () => {
  $http.get('http://localhost:8082/admin/me').then((res: any) => {
    adminForm.isRoot = res.data.data.isRoot;
  })
}
openAdmin();
/*临时渲染的数据*/
const tableData = [
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },{
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },
  {
    phone:'15005263269',
    realName:'张三',
    adminIcon:'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/img.png',
    sex:'男',
    status:'正常',
    isRoot:'yes',
    createTime:'2022-1-12',
    updateTime:'2022-11-10'
  },


]
</script>

<style scoped>

</style>
