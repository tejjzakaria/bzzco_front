import React from 'react'
import Layout from '../../../components/Layout'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import AboutBzzCo from '../../../components/AboutBzzCo'
import MeetFounder from '../../../components/MeetFounder'
import HowItBegan from '../../../components/HowItBegan'
import CardWithBgImg from '../../../components/CardWithBgImg'
import FutureSection from '../../../components/FutureSection'
import TeamSection from '../../../components/TeamSection'
import CardWithBgImg2 from '../../../components/CardWithBgImg2'

const page = () => {
  return (
    <Layout>
      <NavBar/>

      <AboutBzzCo/>
      <MeetFounder/>
      <HowItBegan/>
      <CardWithBgImg/>
      <FutureSection/>
      <TeamSection/>
      <CardWithBgImg2/>

      <Footer/>
    </Layout>
  )
}

export default page
