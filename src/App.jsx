import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import About from './pages/About'
import Contact from './pages/Contact'
import ThankYou from './pages/ThankYou'
import ForAgents from './pages/ForAgents'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/for-agents" element={<ForAgents />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
