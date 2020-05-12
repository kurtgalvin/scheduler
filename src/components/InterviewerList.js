import React from 'react'

import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem'

export default function(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return <InterviewerListItem 
            {...interviewer} 
            setInterviewer={event => props.onChange(interviewer.id)} 
            selected={interviewer.id === props.value} 
          />
        })}
      </ul>
    </section>
  )
}