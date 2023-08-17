<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref } from 'vue'

defineProps({
  cid: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:cid'])

const channelList = ref()
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getChannelList()
</script>
<template>
  <el-select :modelValue="cid" @update:modelValue="emit('update:cid', $event)">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
