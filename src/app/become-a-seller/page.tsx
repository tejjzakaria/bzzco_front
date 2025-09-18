import React from 'react'
import Layout from '../../../components/Layout'
import { NavBar } from '../../../components/NavBar'
import RegisterSellerForm from '../../../components/RegisterSellerForm'
import Footer from '../../../components/Footer'

const page = () => {
  return (
    <Layout>
      <NavBar/>
      <RegisterSellerForm/>
      <Footer/>
    </Layout>
  )
}

export default page
