import React from 'react'
import AllMerchants from '../../../components/AllMerchants'
import Layout from '../../../components/Layout'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'

const page = () => {
    return (
        <Layout>
            <NavBar />
            <AllMerchants />
            <Footer />
        </Layout>
    )
}

export default page
