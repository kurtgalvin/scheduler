import React from 'react'
import classNames from 'classnames'

import 'components/InterviewerListItem.scss'

export default function(props) {
  const className = classNames('interviewers__item', {'interviewers__item--selected': props.selected})

  return (
    <li className={className} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  )
}