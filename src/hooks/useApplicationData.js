import { useState, useEffect } from 'react'
import axios from 'axios'

export default function() {
  const [state, setState] = useState({
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
      setState({
        ...state, 
        days: days.data, 
        appointments: appointments.data,
        interviewers: interviewers.data
      })
    })
  }, [])

  const setDay = day => setState({...state, day})

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({...state, appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}