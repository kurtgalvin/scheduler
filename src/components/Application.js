import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment'
import { getAppointmentsForDay } from 'helpers/selectors'

export default function Application(props) {
  const setDay = day => setState({...state, day})

  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ]).then(([days, appointments]) => {
      setState({...state, days: days.data, appointments: appointments.data})
    })
  }, [])

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
          return (
            <Appointment key={appoint.id} {...appoint}/>
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
