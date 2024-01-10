import {DOM, ViewType} from '../config.js'
import {store, subscribeStore} from '../store.js'
import {getNextDate, getPrevDate} from '../utils/dateUtils.js'

const dayTime = 24*60*60*1000

const resetCalendarStyleHeight = () => {
  const container = DOM.calendarContainer
  const currentHeight = container.offsetHeight
  const newHeight = (container.offsetWidth / 7) * 6 + 50
  if (currentHeight !== newHeight)
  container.style.height = newHeight + 'px'
}

const handleCellClick = (event) => {
  const time = event.target.getAttribute('data-time')
  const foundTimeIndex = store.checkedDates.findIndex(t => t === time)

  if (foundTimeIndex !== -1) {
    store.checkedDates.splice(foundTimeIndex, 1)
  } else {
    store.checkedDates.push(time)
  }
}

const renderCalendar = () => {
  const container = DOM.calendarContainer

  if (store.viewType !== ViewType.Month) {
    if (!container.classList.contains('hidden'))
      container.classList.add('hidden')

    return false
  }

  if (container.classList.contains('hidden'))
    container.classList.remove('hidden')

  container.innerHTML = ""

  resetCalendarStyleHeight()

  const currentDate = new Date(store.currentYear, store.currentMonth, 1)
  const localeCurrentDate = new Date()
  localeCurrentDate.setHours(0,0,0, 0)

  let date = new Date(currentDate)

  let day = date.getDay()
  if (day === 0) day = 7

  if (day > 1) {
    date = new Date(date.getTime() - (day-1) * dayTime)
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')

      const time = date.getTime().toString()

      cell.setAttribute('data-time', time)
      cell.addEventListener('click', handleCellClick)

      cell.innerText = date.toLocaleDateString('ru-RU', { day: '2-digit' })

      if (store.checkedDates.includes(time)) {
        cell.classList.add('full')
      } else {
        cell.classList.add('empty')
      }

      // if other month
      if (date.getMonth() !== store.currentMonth) {
        cell.classList.add('other-month')
      }

      // if today
      if (date.getTime() === localeCurrentDate.getTime()) {
        cell.classList.add('today')
      }

      container.appendChild(cell)

      date = new Date(date.getTime() + dayTime)
    }
  }
}

const renderYearCalendar = () => {
  const container = DOM.yearCalendarContainer

  if (store.viewType !== ViewType.Year) {
    if (!container.classList.contains('hidden'))
      container.classList.add('hidden')

    return false
  }

  if (container.classList.contains('hidden'))
    container.classList.remove('hidden')

  container.innerHTML = ""

  for (let i = 0; i < 12; i++) {
    let date = new Date(store.currentYear, i)
    const currentMonthIndex = date.getMonth()
    const currentMonthName = date.toLocaleDateString('en-EN', { month: 'long' })

    const monthEl = document.createElement('div')
    monthEl.classList.add('year-month')

    const monthText = document.createElement('div')
    monthText.classList.add('title')
    monthText.textContent = currentMonthName

    let day = date.getDay()
    if (day === 0) day = 7

    if (day > 1) {
      date = new Date(date.getTime() - (day-1) * dayTime)
    }

    const monthCellsEl = document.createElement('div')
    monthCellsEl.classList.add('month-cells')

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('div')
        cell.classList.add('month-cell')

        const time = date.getTime().toString()

        if (date.getMonth() !== currentMonthIndex) {
          cell.classList.add('other-day')
        } else if (store.checkedDates.includes(time)) {
          cell.classList.add('full')
        }

        monthCellsEl.appendChild(cell)

        date = new Date(date.getTime() + dayTime)
      }
    }

    monthEl.append(monthText, monthCellsEl)
    container.appendChild(monthEl)
  }
}

const renderSelector = () => {
  if (store.viewType === ViewType.Month)
    DOM.selector.item.innerText = `${(new Date(store.currentYear, store.currentMonth)).toLocaleDateString('en', { month: 'long' })} ${store.currentYear}`
  else if (store.viewType === ViewType.Year)
    DOM.selector.item.innerText = store.currentYear
}

const listenStore = () => {
  renderSelector()

  renderCalendar()
  renderYearCalendar()
}

const handleClickPrevButton = () => {
  if (store.viewType === ViewType.Month) {
    const prevDate = getPrevDate(store.currentYear, store.currentMonth)
    store.currentYear = prevDate.getFullYear()
    store.currentMonth = prevDate.getMonth()
  } else {
    store.currentYear = store.currentYear - 1
  }
}

const handleClickNextButton = () => {
  if (store.viewType === ViewType.Month) {
    const nextDate = getNextDate(store.currentYear, store.currentMonth)
    store.currentYear = nextDate.getFullYear()
    store.currentMonth = nextDate.getMonth()
  } else {
    store.currentYear = store.currentYear + 1
  }
}

export const initCalendar = () => {
  listenStore()

  DOM.selector.arrowPrev.addEventListener('click', handleClickPrevButton)
  DOM.selector.arrowNext.addEventListener('click', handleClickNextButton)

  subscribeStore(listenStore)
}
