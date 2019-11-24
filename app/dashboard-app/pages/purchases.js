import Head from "next/head";
import "../scss/style.scss";
import Navbar from "../components/Navbar";

const Purchases = () => (
    <section className="page-section">
        <Head>
            <title>Dashboard - Purchases</title>
        </Head>
        <Navbar />
        <h1>Hello World from purchases.js</h1>
    </section>
);

export default Purchases;