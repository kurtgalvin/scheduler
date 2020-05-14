export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day)
  if (dayObj) {
    return dayObj.appointments.map(id => state.appointments[id])
  }
  return []
}