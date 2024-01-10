import { initViewSelector } from './module/viewSelector.js'
import {initCalendar} from './module/calendar.js'

const init = () => {
  initViewSelector()
  initCalendar()
}

const main = () => {
  init()
}

main()
