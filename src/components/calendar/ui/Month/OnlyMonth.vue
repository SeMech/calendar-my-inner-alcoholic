<script setup lang="ts">
import { VIEW_TYPE } from '../../../../constants/common';
import { CalendarDay } from '../../../../types/common';
import { Day } from '../Day';

type Props = {
  days: CalendarDay[]
}

defineProps<Props>()
</script>

<template>
  <div class="month">
    <Day
      v-for="(day, dayIndex) of days"
      :key="(dayIndex).toString()"
      :day="day"
      :view-type="VIEW_TYPE.MONTH"
    />
  </div>
</template>

<style scoped>
.month {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 10px;
}
</style>
