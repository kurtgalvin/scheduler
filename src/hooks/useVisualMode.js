import { useState } from 'react'

export default function(initialState) {
  const [history, setHistory] = useState([])
  const [mode, setMode] = useState(initialState)

  function transition(newMode, replace=false) {
    if (!replace) {
      setHistory([...history, mode])
    }
    setMode(newMode)
  }

  function back() {
    if (history.length >= 1) {
      setHistory(history.slice(0, -1))
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back }
}