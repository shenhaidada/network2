<template>
  <el-container class="home-page-content">
    <PageNav></PageNav>

    <section class="home-page-mid">
      <PageHeader></PageHeader>
      <el-main>
        <div
          ref="test"
          :style="{ width: '600px', height: '600px' }"
        ></div>
      </el-main>
    </section>

  </el-container>
</template>

<script setup lang="ts">
// components
import PageNav from "../PageNav/PageNav.vue";
import PageHeader from "../PageHeader/PageHeader.vue";

// node_modules
import { ref, onMounted } from "vue";
import { Message, Menu, Setting } from "@element-plus/icons-vue";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

let test = ref<HTMLElement>(null);

onMounted(() => {
  console.log("test.value: ", test.value);

  let myChart = echarts.init(test.value);
  let option: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<style lang="less">
@import "./HomePage.less";
</style>
