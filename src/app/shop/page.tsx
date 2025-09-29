import React, { Suspense } from 'react'
import Layout from '../../../components/Layout'
import AllProducts from '../../../components/AllProducts'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'

const page = () => {
  return (
    <Layout>
        <NavBar/>
        <Suspense>
          <AllProducts/>
        </Suspense>
        <Footer/>
    </Layout>
  )
}

export default page
