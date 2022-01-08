<template>
  <el-dialog
    v-model="showGramDialog"
    :title="`${gramType}数据展示`"
    width="50%"
    center
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <!-- 直方图 -->
    <section
      class="gram-content"
      ref="gramRef"
    >
    </section>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancelButtonClick">取消</el-button>
        <el-button
          type="primary"
          @click="handleCancelButtonClick"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

// props
let props = defineProps({
  // 图类型 直方图，折线图
  gramType: {
    type: String,
    required: true
  },
  showGramDialog: {
    type: Boolean,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

/**
 * @description
 * 控制弹层打开和关闭
 */
let showDialog = ref<boolean>(props.showGramDialog)
let emit = defineEmits(['update:showGramDialog'])
function handleCancelButtonClick() {
  showDialog.value = false
  emit('update:showGramDialog', showDialog.value)
}

/**
 * @description
 * 图形展示逻辑
 */
let gramRef = ref<HTMLElement>(null)
function showGram() {
  let gram = echarts.init(gramRef.value)
  let option: EChartsOption = {}

  option = {
    width: '92%',
    height: '90%',
    grid: {
      left: '4%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '空气',
        '湿度',
        '温度',
        '氧气',
        '二氧化碳',
        'PM2.5',
        '臭氧',
        '一氧化碳',
        '降雨量'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data.data.dataList,
        type: props.gramType === '折线图' ? 'line' : 'bar' // 判断是折线图还是柱图
      }
    ]
  }

  option && gram.setOption(option)

  // 跟随浏览器变化
  window.addEventListener('resize', function () {
    gram.resize()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', function () {
      gram.resize()
    })
  })
}
nextTick(() => {
  showGram()
})
</script>
<style lang="less">
@import './GramDisplay.less';
</style>