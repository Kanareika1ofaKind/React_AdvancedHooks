import React, { useState } from 'react'

function useInput(name, initialValue = '') {
  const [value, setValue] = useLocalStorage(name, initialValue)
  const onChange = e => setValue(e.target.value)
  return { value, onChange, name }
}

function useLocalStorage(key, value) {
  const [v, setV] = useState(() => {
    const initial = localStorage.getItem(key)
    return initial ? JSON.parse(initial) : value
  })
  const setValueLS = value => {
    setV(value)
    localStorage.setItem(key, JSON.stringify(value)) 
  }
  return [v, setValueLS]
}

export default function App() {
  const inputProps = useInput('username')
  const [count, setCount] = useLocalStorage('count', 1)
  return (
    <div>
      <input placeholder="Type things" {...inputProps} />
      <div>Count is {count} 
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}
