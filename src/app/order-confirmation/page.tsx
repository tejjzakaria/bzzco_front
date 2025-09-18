import React from 'react'
import Layout from '../../../components/Layout'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import OrderConfirmation from '../../../components/OrderConfirmation'

const page = () => {
  return (
    <Layout>
      <NavBar />

      <OrderConfirmation />
      
      <Footer />
      </Layout>
  )
}

export default page
