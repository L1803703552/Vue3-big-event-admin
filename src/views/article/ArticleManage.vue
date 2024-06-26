<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetListService, artDelService } from '@/api/article'
import { formatTime } from '@/utils/format.js'
import ChannelSelect from '@/components/ChannelSelect.vue'
import ArticleEdit from '@/components/ArticleEdit.vue'

// 文章列表
const articleList = ref([])
// 总条数
const total = ref(0)
// loading状态
const loading = ref(false)

// 请求对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章数据
const getArticleList = async () => {
  loading.value = true

  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false
}

// 页面加载的时候自动渲染
getArticleList()

// 处理分页逻辑
const onSizeChange = (size) => {
  // 只要每页条数变化了，那么当前正在访问的页面意义不大了
  // 重新从第一页渲染
  params.value.pagenum = 1 // 当前页数
  params.value.pagesize = size // 每页条数
  // 基于最新的当前页和每页条数 渲染数据
  getArticleList()
}

// 更新当前页
const onCurrentChange = (page) => {
  params.value.pagenum = page
  // 基于最新的当前页，渲染数据
  getArticleList()
}

// 搜索 重置
const onSearch = () => {
  // 按照最新的条件，重新检索
  params.value.pagenum = 1 // 重置页码
  getArticleList()
}
const onReset = () => {
  // 清空筛选条件，重新渲染
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}

const articleEditRef = ref()

// 添加
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}

// 添加或编辑成功回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 添加文章，跳转到最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
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
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
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
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="jumper, prev, pager, next, sizes, total"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
