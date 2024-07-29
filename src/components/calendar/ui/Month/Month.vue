<script setup lang="ts">
import { VIEW_TYPE } from '../../../../constants/common'
import YearMonth from './YearMonth.vue'
import { YearPropsMonth } from './YearMonth.vue'
import OnlyMonth from './OnlyMonth.vue'

type Props = YearPropsMonth & { viewType: VIEW_TYPE }

defineProps<Props>()
</script>

<template>
  <YearMonth
    v-if="viewType === VIEW_TYPE.YEAR"
    :days
    :year
    :month-index
  />
  <OnlyMonth
    v-else
    :days
  />
</template>
