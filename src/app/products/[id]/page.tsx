import React from 'react';
import Layout from '../../../../components/Layout';
import { NavBar } from '../../../../components/NavBar';
import Footer from '../../../../components/Footer';
import SingleProduct from '../../../../components/SingleProduct';

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <Layout>
      <NavBar />
      <SingleProduct id={params.id} />
      <Footer />
    </Layout>
  );
};

export default page;
