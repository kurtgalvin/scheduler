import React from 'react'

import './styles.scss'
import useVisualMode from 'hooks/useVisualMode'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

const Appointment = function(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(interview)
      .then(() => transition(SHOW))
  }

  function onDelete() {
    transition(DELETING)
    props.cancelInterview()
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          key={`${props.id}-Show`}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
    </article>
  )
}

export default Appointment