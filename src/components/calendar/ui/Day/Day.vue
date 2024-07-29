<script setup lang="ts">
import { VIEW_TYPE } from '../../../../constants/common'
import { CalendarDay } from '../../../../types/common'
import MonthDay from './MonthDay.vue'
import YearDay from './YearDay.vue'

type Props = {
  day: CalendarDay,
  viewType: VIEW_TYPE
}

defineProps<Props>()
</script>

<template>
  <MonthDay
    v-if="viewType === VIEW_TYPE.MONTH"
    :day
  />
  <YearDay
    v-else
    :day
  />
</template>

<style scoped>

</style>