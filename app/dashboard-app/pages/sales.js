import Head from "next/head";
import "../scss/style.scss";
import Navbar from "../components/Navbar";

const Sales = () => (
    <section className="page-section">
        <Head>
            <title>Dashboard - Sales</title>
        </Head>
        <Navbar />
        <h1>Hello World from sales.js</h1>
    </section>
);

export default Sales;