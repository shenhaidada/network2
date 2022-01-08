<template>
  <section class="search-input-wrapper">
    <el-select
      class="search-select"
      v-if="selectOptions.length > 0"
      v-model="searchType"
      placeholder="请选择查找类型"
      size="large"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="header-search-wrapper">
      <el-icon>
        <search />
      </el-icon>
      <input
        class="header-search"
        type="search"
        placeholder="Search"
        aria-label="search"
        v-model="searchString"
      >
    </div>
    <div class="other-button-wrapper">
      <span></span>
      <slot name="buttonArea"></slot>
    </div>
  </section>

</template>
<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref, ProtoType } from 'vue'
import { Search } from '@element-plus/icons-vue'
interface SelectOptionsType {
  value: number
  label: string
}
// props
let props = defineProps({
  selectOptions: {
    type: Array as ProtoType<SelectOptionsType>,
    default: []
  },
  selectItemType: {
    type: Number,
    default: ''
  },
  searchStr: {
    type: String,
    required: true
  }
})

// emit
let emit = defineEmits(['update:searchStr', 'update:selectItemType'])
/**
 * @description
 * 搜索逻辑
 */

// 选择搜索类型

let searchString = ref<string>(props.searchStr)
let searchType = ref<string>('')
watch(searchString, (newValue) => {
  emit('update:searchStr', newValue)
})

watch(searchType, (newValue) => {
  emit('update:selectItemType', newValue)
})
</script>
<style lang="less">
@import './SearchInput.less';
</style>