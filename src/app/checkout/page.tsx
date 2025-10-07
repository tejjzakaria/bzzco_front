import CheckoutPage from "../../../components/CheckoutPage";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";
import { NavBar } from "../../../components/NavBar";

export default function Page() {
    return (
        <Layout>
            <NavBar />
            <CheckoutPage />
            <Footer />
        </Layout>

    );
}
