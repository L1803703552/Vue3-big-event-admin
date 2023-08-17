<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
// 控制抽屉的显示和隐藏
const visibleDrawer = ref(false)
// 准备数据
const formModel = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
/*
  组件对外暴露一个方法open，基于open传来的参数，区分是添加还是编辑
  open({}) => 表单无需渲染，说明是添加
  open({ id, ..., ...}) => 表单需要渲染，说明是编辑
  open调用后，可以打开抽屉
*/
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑文章')
  } else {
    console.log('添加文章')
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
