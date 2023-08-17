<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format.js'
// 编辑
const onEditArticle = (row) => {
  ElMessage.success('编辑操作')
  console.log(row)
}
// 删除
const onDelArticle = (row) => {
  ElMessage.success('删除操作')
  console.log(row)
}

// 请求对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const articleList = ref([])
const getArticleList = async () => {
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
}

getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <ChannelSelect v-model:cid="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
            circle
            plain
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-container>
</template>
<style lang="scss" scoped></style>
