import { useState } from 'react'

export default function(initialState) {
  const [history, setHistory] = useState([initialState])
  const [mode, setMode] = useState(initialState)

  function transition(newMode, replace=false) {
    if (!replace) {
      setHistory(prev => [...prev, newMode])
    }
    setMode(newMode)
  }
  
  function back() {
    if (history.length >= 2) {
      setHistory(history.slice(0, -1))
      setMode(history[history.length - 2])
    }
  }

  return { mode, transition, back }
}