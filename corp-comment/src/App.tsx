import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Footer from './components/Footer'
import Container from './components/Container'
import HashtagList from './components/HashtagList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Footer />

      <Container />

      <HashtagList />
    </div>
  )
}

export default App
