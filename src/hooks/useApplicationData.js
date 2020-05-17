import { useReducer, useEffect } from 'react'
import axios from 'axios'

import reducer, { 
  QUERY_SERVER,
  SET_DAY,
  BOOK_INTERVIEW,
  CANCEL_INTERVIEW
} from './useApplicationDataReducer'

export default function() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      dispatch({
        type: QUERY_SERVER,
        days: days.data, 
        appointments: appointments.data,
        interviewers: interviewers.data
      })
    })
  }, [])

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001");
    socket.onmessage = (event) => {
      const { id, interview } = JSON.parse(event.data)
      if (interview) {
        dispatch({ type: BOOK_INTERVIEW, id, interview })
      } else {
        dispatch({ type: CANCEL_INTERVIEW, id, interview })
      }
    }
  }, [])

  function setDay(day) {
    dispatch({ type: SET_DAY, day })
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ 
        type: BOOK_INTERVIEW, 
        id,
        interview
      }))
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: CANCEL_INTERVIEW, id }))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}