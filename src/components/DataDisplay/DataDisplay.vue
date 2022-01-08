<template>
  <section class="data-display-wrapper">
    <!-- 搜索 -->
    <SearchInput
      v-model:selectItemType="selectItemType"
      v-model:searchStr="searchStr"
      :selectOptions="selectOptions"
    >
      <template #buttonArea>
        <el-button @click="handleDataDownloadClick">数据下载</el-button>
      </template>
    </SearchInput>

    <!-- 表头 -->
    <ul class="data-table-header">
      <li class="data-table-device-name">设备名</li>
      <li>区域名</li>
      <li>空气</li>
      <li>湿度</li>
      <li>温度</li>
      <li>氧气</li>
      <li>二氧化碳</li>
      <li>PM2.5</li>
      <li>臭氧</li>
      <li>一氧化碳</li>
      <li>降雨量</li>
      <li class="data-table-operation">操作</li>
    </ul>
    <!-- 数据内容 -->
    <section class="data-content-wrapper">
      <ul
        v-for="(item, index) in showList.data"
        :key="index"
        class="data-content"
      >
        <li class="data-table-device-name">{{ item.name }}</li>
        <li>{{ item.areaName }}</li>
        <li
          v-for="(element, elementIndex) in item.dataList"
          :key="elementIndex"
        >{{ element }}</li>
        <li class="data-operation-button-wrapper">
          <el-button @click="openGramDialog(1, item)">直方图</el-button>
          <el-button @click="openGramDialog(2, item)">折线图</el-button>
        </li>
      </ul>
    </section>
    <GramDisplay
      v-if="showGramDialog"
      :data="currentClickItem"
      :gramType="gramType"
      v-model:showGramDialog="showGramDialog"
    ></GramDisplay>
    <!-- 分页器 -->
    <section class="data-pagination-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="testData.data.length"
        :page-size="pageSize"
        v-model:current-page="currentDataPage"
      >
      </el-pagination>
    </section>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

// utils
import { onExportExcel } from '@/utils/excel.ts'

// components
import SearchInput from '@/components/common/SearchInput.vue'
import GramDisplay from '@/components/DataDisplay/GramDisplay.vue'

/**
 * @description
 * 数据
 */
let testData = reactive({
  data: []
})
for (let i = 0; i < Math.random() * 100; ++i) {
  let name = ''
  for (let m = 0; m < Math.random() * 10; m++) {
    name += String.fromCharCode(
      Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)
    )
  }
  let dataList = []
  for (let z = 0; z < 9; z++) {
    dataList.push((Math.random() * 1000).toFixed(3))
  }
  testData.data.push({
    name: name,
    areaId: 1,
    areaName: '北京',
    createTime: '2022-01-01',
    dataList: dataList
  })
}
let showList = reactive({
  data: testData.data.slice(0, 5)
})

/**
 * @description
 * 数据下载
 */
function handleDataDownloadClick() {
  let downloadData = []
  downloadData.push([
    '设备名',
    '区域名',
    '空气',
    '湿度',
    '温度',
    '氧气',
    '二氧化碳',
    'PM2.5',
    '臭氧',
    '一氧化碳',
    '降雨量'
  ])
  testData.data.forEach((item) => {
    let data = []
    data.push(item.name)
    data.push(item.areaName)
    data.push(...item.dataList)
    downloadData.push(data)
  })
  onExportExcel(downloadData)
}

/**
 * @description
 * 分页逻辑
 */
let pageSize = ref<number>(5)
let currentDataPage = ref<number>(1)
// 监听页脚改变
watch(currentDataPage, (newValue) => {
  let beginNumber = pageSize.value * (newValue - 1)
  showList.data = testData.data.slice(beginNumber, beginNumber + pageSize.value)
})

/**
 * @description
 * 搜索逻辑
 */
// 搜索的目标类型
let selectItemType = ref<number>(0)
// 传入的类型选项
let selectOptions = reactive([
  {
    value: 1,
    label: '设备名'
  },
  {
    value: 2,
    label: '区域名'
  }
])
let searchStr = ref<string>('')

// 监听搜索输入
watch(searchStr, (newValue) => {
  if (newValue === '') {
    let beginNumber = pageSize.value * (currentDataPage.value - 1)
    showList.data = testData.data.slice(
      beginNumber,
      beginNumber + pageSize.value
    )
  } else if (selectItemType.value == 1) {
    // 设备名
    showList.data = testData.data.filter(
      (item) => item.name.indexOf(newValue) !== -1
    )
  } else {
    // 区域名
    showList.data = testData.data.filter(
      (item) => item.areaName.indexOf(newValue) !== -1
    )
  }
})

/**
 * @description
 * 图展示逻辑
 */
let showGramDialog = ref<boolean>(false)
let gramType = ref<string>('')
let currentClickItem = reactive({
  data: {}
})
function openGramDialog(type: number, item: any) {
  if (type === 1) {
    gramType.value = '直方图'
  } else {
    gramType.value = '折线图'
  }
  currentClickItem.data = item
  showGramDialog.value = true
}
</script>
<style lang="less">
@import './DataDisplay.less';
</style>