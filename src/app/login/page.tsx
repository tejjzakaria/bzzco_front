import React from 'react'
import Layout from '../../../components/Layout'
import LoginForm from '../../../components/LoginForm'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'

const page = () => {
  return (
    <Layout>
        <NavBar/>
        <LoginForm/>
        <Footer/>
    </Layout>
  )
}

export default page
