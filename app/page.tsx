import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurProcess from './components/OurProcess'
import FreeTools from './components/FreeTools'
import LanguagePartner from './components/LanguagePartner'
import About from './components/About'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurProcess />
      <FreeTools />
      <LanguagePartner />
      <About />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  )
}

export default page
