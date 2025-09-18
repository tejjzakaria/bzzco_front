import React from 'react'
import Layout from '../layout'
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
