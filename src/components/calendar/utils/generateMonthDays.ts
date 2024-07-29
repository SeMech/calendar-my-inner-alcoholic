import { DAY_TIME } from "../../../constants/common"
import { CalendarDay } from "../../../types/common"

export const generateMonthdays = (
  dates: string[],
  selectedYear: number,
  selectedMonthIndex: number,
  currentDay: Date
) => {
  const firstCurrentMonthDay = new Date(selectedYear, selectedMonthIndex, 1)

  let date = new Date(firstCurrentMonthDay)

  let day = date.getDay()
  if (day === 0) day = 7

  if (day > 1) {
    date = new Date(date.getTime() - (day-1) * DAY_TIME)
  }

  const monthDays: CalendarDay[] = []

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const time = date.getTime().toString()

      monthDays.push({
        text: date.toLocaleDateString('ru-RU', { day: '2-digit' }),
        time,
        isToday: time === currentDay.getTime().toString(),
        isChecked: dates.includes(time),
        isOtherMonth: date.getMonth() !== selectedMonthIndex,
        isNotCome: +time > currentDay.getTime(),
      })

      date = new Date(date.getTime() + DAY_TIME)
    }
  }

  return monthDays
}