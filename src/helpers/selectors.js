export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day)
  if (dayObj) {
    return dayObj.appointments.map(id => state.appointments[id])
  }
  return []
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day)
  if (dayObj) {
    return dayObj.interviewers.map(id => state.interviewers[id])
  }
  return []
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return {
      ...interview,
      interviewer
    }
  } 
  return null
}