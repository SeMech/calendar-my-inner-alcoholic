<script setup lang="ts">
import {VIEW_TYPE} from '../../constants/common.ts'
import {computed} from 'vue'
import { getMonthName } from '../../utils/dateUtils.ts'

type Props = {
  viewType: VIEW_TYPE,
  nextMonth(): void,
  prevMonth(): void,
  nextYear(): void,
  prevYear(): void,
  selectedMonthIndex: number,
  selectedYear: number,
}

const props = defineProps<Props>()

const nextFn = computed(() => props.viewType === VIEW_TYPE.MONTH ? props.nextMonth : props.nextYear)
const prevFn = computed(() => props.viewType === VIEW_TYPE.MONTH ? props.prevMonth : props.prevYear)

</script>

<template>
  <section class="controls">
    <div
      class="arrow"
      @click="prevFn"
    />
    <div class="item">
      {{ viewType === VIEW_TYPE.MONTH ? getMonthName(props.selectedYear, props.selectedMonthIndex) : undefined }} {{ selectedYear }}
    </div>
    <div
      class="arrow right"
      @click="nextFn"
    />
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;

  width: 280px;
  margin-bottom: 10px;
}

.item{
  text-align: center;
  font-size: 16px;
}

.arrow {
  width: 20px;
  height: 20px;

  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("src/assets/icons/chevron-left.svg");
}

.arrow.right {
  transform: rotate(180deg);
}

.arrow.disabled {
  opacity: .5;
  cursor: default;
}
</style>
