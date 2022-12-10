<template>
  <div style="position: absolute;right:3%;top: 30px;width: 200px">
    <el-input
        v-model="searchValue"
        class="w-50 m-2"
        placeholder="Please Input"
        :suffix-icon="Search"
    />
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
import {ref} from "vue";
/*搜索框值的绑定*/
const searchValue = ref('');
/*禁用的事件*/
const handleClick = () => {
  console.log('click')
}
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
