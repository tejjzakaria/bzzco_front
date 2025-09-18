import React from 'react'
import Layout from '../../../components/Layout'
import { NavBar } from '../../../components/NavBar'
import AllCategories from '../../../components/AllCategories'
import Footer from '../../../components/Footer'

const page = () => {
  return (
    <Layout>
      <NavBar />
      <AllCategories />
      <Footer />
    </Layout>
  )
}

export default page
