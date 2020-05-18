import React from 'react'
import PropTypes from 'prop-types'

import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem'

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return <InterviewerListItem 
            key={interviewer.id}
            {...interviewer} 
            setInterviewer={event => props.onChange(interviewer.id)} 
            selected={interviewer.id === props.value} 
          />
        })}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default InterviewerList