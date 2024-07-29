<script setup lang="ts">
import {VIEW_TYPE} from '../../constants/common.ts'

type Props = {
  viewType: VIEW_TYPE,
  setMonthType(): void,
  setYearType(): void
}

defineProps<Props>()
</script>

<template>
  <section class="tabs">
    <div
      :class="['tab', { 'active': viewType === VIEW_TYPE.MONTH }]"
      @click="setMonthType"
    >
      Month
    </div>
    <div
      :class="['tab', { 'active': viewType === VIEW_TYPE.YEAR }]"
      @click="setYearType"
    >
      Year
    </div>
  </section>
</template>

<style scoped>
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;

  border-bottom: 2px solid #eee;
}

.tabs .tab {
  padding-bottom: 10px;
  margin-bottom: -2px;

  font-size: 18px;
  color: var(--no-active-text-color);
  cursor: pointer;
}

.tabs .tab.active {
  color: var(--text-color);
  border-bottom: 2px solid red;
}
</style>
