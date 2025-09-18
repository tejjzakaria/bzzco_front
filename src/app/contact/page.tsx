import React from 'react'
import { NavBar } from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import Layout from '../../../components/Layout'
import { Contact } from 'lucide-react'
import ContactForm from '../../../components/ContactForm'

const page = () => {
    return (
        <Layout>
            <NavBar />

            <ContactForm/>

            <Footer />
        </Layout>
    )
}

export default page
