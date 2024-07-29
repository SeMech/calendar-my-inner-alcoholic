<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import {CalendarDay} from '../../types/common.ts'

import Month from './ui/Month.vue'
import {VIEW_TYPE} from '../../constants/common.ts'

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
  const firstCurrentMonthDay = new Date(props.selectedYear, props.selectedMonthIndex, 1)
  const dayTime = 24*60*60*1000

  let date = new Date(firstCurrentMonthDay)

  let day = date.getDay()
  if (day === 0) day = 7

  if (day > 1) {
    date = new Date(date.getTime() - (day-1) * dayTime)
  }

  const monthDays: CalendarDay[] = []

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const time = date.getTime().toString()

      monthDays.push({
        text: date.toLocaleDateString('ru-RU', { day: '2-digit' }),
        time,
        isToday: time === props.currentDay.getTime().toString(),
        isChecked: props.dates.includes(time),
        isOtherMonth: date.getMonth() !== props.selectedMonthIndex,
        isNotCome: +time > props.currentDay.getTime(),
      })

      date = new Date(date.getTime() + dayTime)
    }
  }

  month.value = monthDays

})
</script>

<template>
  <div class="calendar">
    <Month :days="month" />
  </div>
</template>

<style scoped>

.calendar {
  width: 280px;
  height: 290px;
}

</style>
