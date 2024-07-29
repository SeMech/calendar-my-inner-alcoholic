<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CalendarDay } from '../../types/common.ts'

import { VIEW_TYPE } from '../../constants/common.ts'

import { Month } from './ui/Month'
import { generateMonthdays } from './utils/generateMonthDays.ts'

type Props = {
  selectedYear: number,
  selectedMonthIndex: number,
  dates: string[],
  currentDay: Date,
  viewType: VIEW_TYPE
}

const props = defineProps<Props>()

const month = ref<CalendarDay[]>([])

watchEffect(() => {
  month.value = generateMonthdays(props.dates, props.selectedYear, props.selectedMonthIndex, props.currentDay)
})
</script>

<template>
  <div class="calendar">
    <Month
      :year="selectedYear"
      :month-index="selectedMonthIndex"
      :days="month"
      :view-type
    />
  </div>
</template>

<style scoped>
.calendar {
  width: 280px;
  height: 290px;
}


</style>
