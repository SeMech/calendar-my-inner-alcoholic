<script setup lang="ts">
import { VIEW_TYPE } from '../../../../constants/common';
import { CalendarDay } from '../../../../types/common';
import { getMonthName } from '../../../../utils/dateUtils';
import { Day } from '../Day';

export type YearPropsMonth = {
  days: CalendarDay[],
  year: number,
  monthIndex: number
}

defineProps<YearPropsMonth>()
</script>

<template>
  <div class="month">
    <div class="title">
      {{ getMonthName(year, monthIndex) }}
    </div>
    <div class="cells">
      <Day
        v-for="(day, dayIndex) of days"
        :key="(dayIndex).toString()"
        :day="day"
        :view-type="VIEW_TYPE.YEAR"
      />
    </div>
  </div>
</template>

<style scoped>
.month {
  display: flex;
  flex-direction: column;

  cursor: pointer;

  width: 80px;
  height: 80px;
}

.title {
  width: 100%;
  margin-bottom: 4px;
  font-size: 14px;
  text-align: center;
}

.cells {
  width: 100%;
  height: 100%;

  display: grid;

  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 3px 3px;
}
</style>
