import { useState } from 'react'
import './App.css'
import Home from './Home.jsx'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className ='first'>
      <Home />
    </div>
  )
}

export default App