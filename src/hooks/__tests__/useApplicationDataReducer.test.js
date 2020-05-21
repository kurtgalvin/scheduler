import reducer, { 
  QUERY_SERVER,
  SET_DAY,
  BOOK_INTERVIEW,
  CANCEL_INTERVIEW
} from '../applicationDataReducer'

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

test("QUERY_SERVER Replace days, appointments, and interviewers with input", () => {
  const action = {
    type: QUERY_SERVER,
    days: "NEW",
    appointments: "NEW",
    interviewers: "NEW"
  }
  const result = reducer(state, action)
  expect(result.days).toBe("NEW")
  expect(result.appointments).toBe("NEW")
  expect(result.interviewers).toBe("NEW")
})

test("SET_DAY Replace day with input", () => {
  const action = {
    type: SET_DAY,
    day: "NEW"
  }
  const result = reducer(state, action)
  expect(result.day).toBe("NEW")
})

test("BOOK_INTERVIEW and update spots", () => {
  const newInterview = { student: "Joe Mike", interviewer: 1 }
  const action = {
    type: BOOK_INTERVIEW,
    id: 1,
    interview: newInterview
  }
  const result = reducer(state, action)
  expect(result.appointments[1].interview).toMatchObject(newInterview)
  expect(result.days[0].spots).toBe(1)
})

test("CANCEL_INTERVIEW and update spots", () => {
  const action = {
    type: CANCEL_INTERVIEW,
    id: 3
  }
  const result = reducer(state, action)
  expect(result.appointments[3].interview).toBe(null)
  expect(result.days[0].spots).toBe(3)
})