<script setup lang="ts">
import {Calendar} from '../components/calendar'
import {computed, ref} from 'vue'
import {getCurrentMonthIndex, getCurrentYear, getNextDate, getPrevDate} from '../utils/dateUtils.ts'
import {Statistic} from '../components/statistic'
import {Controls} from '../components/controls'
import {VIEW_TYPE} from '../constants/common.ts'
import {Tabs} from '../components/tabs/index.ts'

const currentYear = ref(getCurrentYear())
const currentMonthIndex = ref(getCurrentMonthIndex())

const viewType = ref(VIEW_TYPE.MONTH)

const currentDay = new Date()
currentDay.setHours(0,0,0, 0)

const mockDataDays = [
  currentDay.getTime().toString()
]

const isShowedTodayButton = computed(() =>
  currentYear.value !== getCurrentYear()
  || currentMonthIndex.value !== getCurrentMonthIndex()
)

const setToday = () => {
  currentYear.value = getCurrentYear()
  currentMonthIndex.value = getCurrentMonthIndex()
}

const prevMonth = () => {
  const prevDate = getPrevDate(currentYear.value, currentMonthIndex.value)
  currentYear.value = prevDate.getFullYear()
  currentMonthIndex.value = prevDate.getMonth()
}

const nextMonth = () => {
  const nextDate = getNextDate(currentYear.value, currentMonthIndex.value)
  currentYear.value = nextDate.getFullYear()
  currentMonthIndex.value = nextDate.getMonth()
}

const prevYear = () => {
  currentYear.value -= 1
}

const nextYear = () => {
  currentYear.value += 1
}

const setMonthType = () => viewType.value = VIEW_TYPE.MONTH
const setYearType = () => viewType.value = VIEW_TYPE.YEAR
</script>

<template>
  <header>
    <h1 class="title">
      Calendar
    </h1>

    <Tabs
      :set-month-type="setMonthType"
      :set-year-type="setYearType"
      :view-type="viewType"
    />
  </header>

  <main>
    <Controls
      :next-month="nextMonth"
      :prev-month="prevMonth"
      :next-year="nextYear"
      :prev-year="prevYear"
      :view-type="viewType"
      :selected-year="currentYear"
      :selected-month-index="currentMonthIndex"
    />

    <Calendar
      :selected-month-index="currentMonthIndex"
      :selected-year="currentYear"
      :current-day="currentDay"
      :dates="mockDataDays"
      :view-type
    />

    <Statistic
      :current-day="currentDay"
      :dates="mockDataDays"
    />

    <button
      v-if="isShowedTodayButton"
      class="button-go-today"
      @click="setToday"
    >
      Go to today
    </button>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    max-width: 375px;
  }

  header {
    padding: 20px 0;
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  .button-go-today {
    margin-top: 20px;
    width: 200px;
    height: 40px;

    background: none;
    border: 2px solid #767676;

    cursor: pointer;
    color: #767676;
  }
</style>
