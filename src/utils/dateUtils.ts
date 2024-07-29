export const getCurrentYear = () => (new Date()).getFullYear()

export const getCurrentMonthIndex = () => (new Date()).getMonth()

export const getPrevDate = (year: number, month: number) => {
  if (month === 1) {
    year--
    month = 12
  } else {
    month--
  }

  return new Date(year, month)
}

export const getNextDate = (year: number, month: number) => {
  if (month === 12) {
    year++
    month = 1
  } else {
    month++
  }

  return new Date(year, month)
}

export const getMonthName = (year: number, monthIndex: number) => (new Date(year, monthIndex)).toLocaleDateString('en', { month: 'long' })

