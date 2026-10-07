import React from 'react'
import AboutNavBar from '../components/AboutNavBar'
import OurServices from '../components/OurServices'
import OurPartner from '../components/OurPartner'
import Speciality from '../components/Speciality'
import Team from '../components/Team'
import Pricing from '../components/Pricing'
import Process from '../components/Process'
import Footer from '../components/Footer'

function Service() {
  return (
    <div>
      <AboutNavBar/>
      <OurServices/>
      <OurPartner/>
      <Speciality/>
      <Team/>
      <Process/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default Service
