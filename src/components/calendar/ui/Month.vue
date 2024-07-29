<script setup lang="ts">
import {CalendarDay} from '../../../types/common.ts'

type Props = {
  days: CalendarDay[],
}

defineProps<Props>()
</script>

<template>
  <div :class="['month']">
    <div
      v-for="(day, dayIndex) of days"
      :key="(dayIndex).toString()"
      :class="[
        'cell',
        day.isChecked ? 'full' : 'empty',
        {
          notCome: day.isNotCome,
          today: day.isToday,
          'other-month': day.isOtherMonth
        }
      ]"
    >
      {{ day.text }}
    </div>
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

.month .cell {
  padding: 3px 11px 0;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
}

.cell.empty {
  background-image: url("src/assets/icons/empty-glass.svg");
}

.cell.full {
  background-image: url("src/assets/icons/full-glass.svg");
}

.cell.not-come {
  background-image: url("src/assets/icons/not-come-glass.svg");
  color: var(--not-come-text-color);
}

.cell.today {
  color: red;
}

.cell.other-month {
  opacity: .5;
}
</style>
