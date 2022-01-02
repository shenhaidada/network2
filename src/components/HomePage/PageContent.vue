<template>
  <section class="page-content">
    <!-- 左边内容 -->
    <section class="page-left-content">
      <!-- 大卡片区域 -->
      <div class="large-page-card-wrapper">
        <p class="large-page-card-text">标题没想好</p>
        <div
          class="large-page-card"
          ref="lineChartRef"
        ></div>
      </div>

      <!-- 2个小卡片 -->
      <div class="two-small-page-card">
        <div class="small-card small-card-margin-right">
          <p class="card-header">卡片标题</p>
          <div class="four-card-wrapper">
            <div class="four-card-one">
              <el-icon>
                <circle-check-filled />
              </el-icon>

              <p class="four-card-title">标题</p>
              <p class="four-card-description">描述</p>
            </div>
            <div class="four-card-one">
              <el-icon>
                <watch />
              </el-icon>
              <p class="four-card-title">标题</p>
              <p class="four-card-description">描述</p>
            </div>
            <div class="four-card-one">
              <el-icon>
                <video-camera />
              </el-icon>
              <p class="four-card-title">标题</p>
              <p class="four-card-description">描述</p>
            </div>
            <div class="four-card-one">
              <el-icon>
                <star />
              </el-icon>
              <p class="four-card-title">标题</p>
              <p class="four-card-description">描述</p>
            </div>
          </div>
        </div>
        <!-- 展示饼图 -->
        <div class="small-card small-card-margin-left">
          <p class="pie-chart-description">
            <span>数据总数</span>
            <span class="description-number">458</span>
          </p>
          <div
            class="pie-chart-wrapper"
            ref="pieChartRef"
          ></div>
        </div>
      </div>
    </section>

    <!-- 右边内容 -->
    <section class="page-right-content">
      <!-- 右边大卡片 -->
      <div class="page-right-card-large">
        <el-icon class="icon-tickets">
          <tickets />
        </el-icon>
        <el-icon class='icon-monitor'>
          <monitor />
        </el-icon>
        <p class="right-card-large-title">2000</p>
        <p class="right-card-large-description">Machines</p>
      </div>
      <!-- 右边的一些小卡片 -->
      <div class="page-right-card-small">
        <el-icon class="right-card-small-icon-wrapper">
          <search />
        </el-icon>
        <div class="small-icon-text">
          <p class="small-icon-text-title">100</p>
          <p class="small-icon-text-description">次探测</p>
        </div>
        <el-icon class="right-card-small-right-icon">
          <suitcase />
        </el-icon>
      </div>
      <!-- 右边的一些小卡片 -->
      <div class="page-right-card-small">
        <el-icon class="right-card-small-icon-wrapper">
          <search />
        </el-icon>
        <div class="small-icon-text">
          <p class="small-icon-text-title">100</p>
          <p class="small-icon-text-description">次探测</p>
        </div>
        <el-icon class="right-card-small-right-icon">
          <suitcase />
        </el-icon>
      </div>
      <!-- 右边的一些小卡片 -->
      <div class="page-right-card-small">
        <el-icon class="right-card-small-icon-wrapper">
          <search />
        </el-icon>
        <div class="small-icon-text">
          <p class="small-icon-text-title">100</p>
          <p class="small-icon-text-description">次探测</p>
        </div>
        <el-icon class="right-card-small-right-icon">
          <suitcase />
        </el-icon>
      </div>
      <!-- 右边的一些小卡片 -->
      <div class="page-right-card-small">
        <el-icon class="right-card-small-icon-wrapper">
          <search />
        </el-icon>
        <div class="small-icon-text">
          <p class="small-icon-text-title">100</p>
          <p class="small-icon-text-description">次探测</p>
        </div>
        <el-icon class="right-card-small-right-icon">
          <suitcase />
        </el-icon>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue'
import {
  Suitcase,
  Search,
  CircleCheckFilled,
  Watch,
  VideoCamera,
  Star,
  Monitor,
  Tickets
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

/**
 * @description
 * 左边页面卡片逻辑代码
 */
// 折线图
let lineChartRef = ref<HTMLElement>(null)
// 饼状图
let pieChartRef = ref<HTMLElement>(null)
nextTick(() => {
  // 折线图逻辑
  let lineChart = echarts.init(lineChartRef.value)
  let lineOption: EChartsOption = {
    width: '92%',
    height: '60%',
    grid: {
      left: '4%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  lineOption && lineChart.setOption(lineOption)
  window.addEventListener('resize', function () {
    lineChart.resize()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', function () {
      lineChart.resize()
    })
  })

  // 饼状图逻辑
  let pieChart = echarts.init(pieChartRef.value)
  let pieOption: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '80%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        width: '100%',
        height: '100%',
        center: ['50%', '40%'],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  }
  pieOption && pieChart.setOption(pieOption)
})
</script>
<style lang="less">
@import './PageContent.less';
</style>