import React from 'react'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'

import { NavBar } from '../../../components/NavBar'
import WorkWithUsForm from '../../../components/WorkWithUsForm'

const page = () => {
    return (
        <Layout>
            <NavBar />

            <WorkWithUsForm />

            <Footer />
        </Layout>
    )
}

export default page
