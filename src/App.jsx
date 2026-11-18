
import React, { useState, useRef, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import TrustedBy from './Components/TrustedBy'
import Services from './Components/Services'
import OurWork from './Components/OurWork'
import Teams from './Components/Teams'
import ContactUs from './Components/ContactUS'
import Footer from './Components/Footer'

const App = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  // Refs for custom cursor position tracking
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {

    // Check if device supports hover and fine pointer
    const isDesktop = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    )

    if (!isDesktop.matches) return

    let animationId

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`
      }
    }

    const animate = () => {

      position.current.x +=
        (mouse.current.x - position.current.x) * 0.1

      position.current.y +=
        (mouse.current.y - position.current.y) * 0.1

      if (outlineRef.current) {
        outlineRef.current.style.transform =
          `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
      }

      animationId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)

    animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }

  }, [])

  return (
    <div className='dark:bg-black relative overflow-hidden'>

      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer />

      {/* Custom Cursor Ring */}
      <div
        ref={outlineRef}
        className='hidden md:block fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]'
        style={{ transition: 'none' }}
      />

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className='hidden md:block fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]'
      />

    </div>
  )
}

export default App
