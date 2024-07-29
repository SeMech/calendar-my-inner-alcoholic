<script setup lang="ts">
import { CalendarDay } from '../../../../types/common'

type Props = {
    day: CalendarDay
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'day',
      day.isChecked ? 'full' : 'empty',
      {
        notCome: day.isNotCome,
        today: day.isToday,
        'other-month': day.isOtherMonth
      }
    ]"
  />
</template>

<style scoped>
.day {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: var(--no-active-text-color)
}

.day.full {
  background-color: red;
}

.day.not-come {
  background-color: var(--not-come-icon-color);
}

.day.other-month {
  background-color: rgba(0,0,0,0);
}
</style>