<script setup>
import { ref } from 'vue'
import { artGetChannelService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
}

getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确认删除该分类？', '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel" type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="onEditChannel(row, $index)"
            circle
            plain
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="onDelChannel(row, $index)"
            circle
            plain
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据！"></el-empty>
      </template>
    </el-table>
    <ChannelEdit @success="onSuccess" ref="dialog"></ChannelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
