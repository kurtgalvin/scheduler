import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment'
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors'

export default function Application(props) {
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appoint => {
          const interview = getInterview(state, appoint.interview);
          return (
            <Appointment 
              key={appoint.id} 
              {...appoint}
              interview={interview}
              interviewers={getInterviewersForDay(state, "Monday")}
              bookInterview={interview => bookInterview(appoint.id, interview)}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
