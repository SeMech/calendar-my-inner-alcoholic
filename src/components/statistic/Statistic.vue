<script setup lang="ts">
import {ref, UnwrapRef, watchEffect} from 'vue'
import {DAY_TIME} from '../../constants/common.ts'

type Props = {
  dates: string[],
  currentDay: Date,
}

const props = defineProps<Props>()

const yearStatistic = ref({
  totalDays: 0,
  drinkingDays: 0,
  notDrinkingDays: 0
})

watchEffect(
  () => {
    const firstYearDay = new Date(props.currentDay.getFullYear(), 0, 1)
    firstYearDay.setHours(0,0,0, 0)

    const statisticData: UnwrapRef<typeof yearStatistic> = {
      totalDays: Math.floor((props.currentDay.getTime() - firstYearDay.getTime() + DAY_TIME) / DAY_TIME),
      drinkingDays: props.dates.length,
      notDrinkingDays: 0
    }

    statisticData.notDrinkingDays = statisticData.totalDays - statisticData.drinkingDays

    yearStatistic.value = statisticData
  }
)

</script>

<template>
  <section class="statistic">
    <div class="statistic-title">
      Statistic
    </div>
    <div class="statistic-param">
      Days of drinking: <span class="statistic-value">{{ yearStatistic.drinkingDays }}</span>
    </div>
    <div class="statistic-param">
      I haven't had a drink in days: <span class="statistic-value">{{ yearStatistic.notDrinkingDays }}</span>
    </div>
    <div class="statistic-param">
      Total days: <span class="statistic-value">{{ yearStatistic.totalDays }}</span>
    </div>
  </section>
</template>

<style scoped>
.statistic {
  width: 280px;
  margin-top: 50px;
}

.statistic-title {
  font-size: 20px;
  margin-bottom: 15px;
}
</style>
