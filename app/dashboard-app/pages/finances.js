import Head from "next/head";
import "../scss/style.scss";
import Navbar from "../components/Navbar";

const Finances = () => (
    <section className="page-section">
        <Head>
            <title>Dashboard - Finances</title>
        </Head>
        <Navbar />
        <h1>Hello World from finances.js</h1>
    </section>
);

export default Finances;
