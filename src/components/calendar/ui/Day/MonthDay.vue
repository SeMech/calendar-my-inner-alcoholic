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
  >
    {{ day.text }}
  </div>
</template>

<style scoped>
.day {
  padding: 3px 11px 0;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
}

.day.empty {
  background-image: url("src/assets/icons/empty-glass.svg");
}

.day.full {
  background-image: url("src/assets/icons/full-glass.svg");
}

.day.not-come {
  background-image: url("src/assets/icons/not-come-glass.svg");
  color: var(--not-come-text-color);
}

.day.today {
  color: red;
}

.day.other-month {
  opacity: .5;
}
</style>