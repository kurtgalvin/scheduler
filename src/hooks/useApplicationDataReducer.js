import { getSpotstForDay } from 'helpers/selectors'

export const QUERY_SERVER = "QUERY_SERVER";
export const SET_DAY = "SET_DAY";
export const BOOK_INTERVIEW = "BOOK_INTERVIEW";
export const CANCEL_INTERVIEW = "CANCEL_INTERVIEW"

function reducerBookInterview(state, action) {
  const id = action.id
  const interview = action.interview
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = state.days.map(day => {
    return {...day, spots: getSpotstForDay({ ...state, appointments }, day.name)}
  })
  return { days, appointments }
}

function reducerCancelInterview(state, action) {
  const id = action.id
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = state.days.map(day => {
    return {...day, spots: getSpotstForDay({ ...state, appointments }, day.name)}
  })
  return { days, appointments }
}

export default function reducer(state, action) {
  if (action.type === QUERY_SERVER) {
    return {
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers
    }
  } else if (action.type === SET_DAY) {
    return {
      ...state,
      day: action.day
    }
  } else if (action.type === BOOK_INTERVIEW) {
    const { days, appointments } = reducerBookInterview(state, action)
    return {
      ...state,
      days,
      appointments
    }
  } else if (action.type === CANCEL_INTERVIEW) {
    const { days, appointments } = reducerCancelInterview(state, action)
    return {
      ...state,
      days, 
      appointments
    }
  }
}