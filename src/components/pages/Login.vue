<template>
  <div class="login">
    <span v-if="isPassWord" style="color: #589ef8;font-size: 14px;position: absolute;top: 15px;left: 20px">密码登陆</span>
    <span v-if="isPassWord===false" style="color: #589ef8;font-size: 14px;position: absolute;top: 15px;left: 20px">手机号登陆</span>
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
        <el-button plain style="color: #589ef8;position: absolute;right: -60%" @click="sendCode">Send Code</el-button>
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
        >Login
        </el-button
        >
        <el-button @click="resetForm()"
                   style="margin-left: 50px;width: 110px"
        >Reset</el-button>
      </el-form-item>
    </el-form>
    <el-button v-if="isPassWord" plain @click="PassWordLogin" style="background: transparent;border: 0;color: #589ef8;font-size: 10px;float: right">Switch to password login</el-button>
    <el-button v-if="isPassWord===false" plain @click="PassWordLogin" style="background: transparent;border: 0;color: #589ef8;font-size: 10px;float: right">Switch to phone login</el-button>
  </div>


  <el-dialog v-model="centerDialogVisible" title="注意" width="30%" center :draggable="true">
    <span>
      <span v-for="i in 11" :key="i">&emsp;</span>
      这个手机号尚未注册，是否注册?
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Register">Register</el-button>
        <el-button type="primary" @click="Cancel">
          Cancel
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref, onBeforeUnmount, onMounted, getCurrentInstance} from 'vue'
import { ElNotification } from 'element-plus'
/*引入路由*/
import {useRoute, useRouter} from "vue-router";

const centerDialogVisible = ref(false)

/*路由变量*/
const route = useRoute();
const router = useRouter();
/*引入axios*/
const currentInstance = getCurrentInstance()
const {$http}: any = currentInstance?.appContext.config.globalProperties

const adminForm = reactive({phone:'',code:'',password:'',identity:'admin'})
const isPassWord = ref(false);
const isClickSubmitPhone = ref(false)
const isClickSubmitCode = ref(false)
const isClickSubmitPassWord = ref(false)

const loginBg = ref('url(' + 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/14753/39578544_p2_master1200.jpg' + ')')
onMounted(() => {
  // 添加背景图片
  document.body.style.backgroundSize = '100%';
  document.body.style.backgroundImage = loginBg.value;
})

onBeforeUnmount(() => {
  // 清除背景图片
  document.body.style.backgroundImage = ''
})

const i=ref(0);

const sleep = (millisecond:number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

const PassWordLogin = async () => {
  await sleep(500);
  isPassWord.value = !isPassWord.value;
  isClickSubmitPhone.value=false;
  isClickSubmitCode.value=false;
  isClickSubmitPassWord.value=false;
}

/*发送验证码事件*/
const sendCode = () => {
  /*axios发送请求并将手机传给后端获取验证码*/
  $http.post('http://localhost:8082/admin/code/' , adminForm)
      .then((res:any)=>{
        console.log(res)
        if(res.data.success){
          ElNotification({
            title: 'Success',
            message: '验证码发送成功',
            type: 'success',
          })
        }else{
          ElNotification({
            title: 'Error',
            message: res.data.errorMsg,
            type: 'error',
          })
        }
      });
}

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
  $http.post('http://localhost:8082/admin/login/', adminForm).then((res: any) => {  //发送axios请求并将登陆对象传递给后端
    console.log(res)
    if(res.data.errorMsg==='是否要新建管理员?'){
      centerDialogVisible.value = true;
    }else{
      if (res) {
        sessionStorage.setItem('token', res.data.data)   //将token写入session
      }
      if(res.data.success) {
        router.push({
          name: 'Principal'
        });
      }
    }
  })
}

const resetForm = async () => {
  await sleep(500);
  isClickSubmitPhone.value = false;
  isClickSubmitCode.value = false;
  isClickSubmitPassWord.value = false;
  adminForm.code = '';
  adminForm.phone = '';
  adminForm.password = '';
}

const Register = () => {
  centerDialogVisible.value = false;
  $http.post('http://localhost:8082/admin/register/', adminForm).then((res: any) => {
    if (res.data.data.success) {
      /*创建成功，3秒后跳转*/
    }
  })
}

const Cancel = () => {
  adminForm.password='';
  adminForm.phone='';
  adminForm.code='';
  centerDialogVisible.value = false;
}

const f5 = () => {
  if(i.value===0) {

    i.value=1;
  }
}
f5();
</script>

<style scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
