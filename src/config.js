export const DOM = {
  tabViewTypeMonth: document.getElementById('tab-month'),
  tabViewTypeYear: document.getElementById('tab-year'),

  calendarContainer: document.getElementById('calendar-root'),
  yearCalendarContainer: document.getElementById('year-calendar-root'),

  selector: {
    arrowPrev: document.querySelector('.selector--arrow[data-arrow-mode="prev"]'),
    arrowNext: document.querySelector('.selector--arrow[data-arrow-mode="next"]'),
    item: document.querySelector('.selector--item')
  }
}

export const ViewType = {
  Month: 'Month',
  Year: 'Year'
}
