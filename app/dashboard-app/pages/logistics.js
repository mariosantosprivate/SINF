import Head from "next/head";
import "../scss/style.scss";
import Navbar from "../components/Navbar";

const Logistics = () => (
    <section className="page-section">
        <Head>
            <title>Dashboard - Logistics</title>
        </Head>
        <Navbar />
        <h1>Hello World from logistics.js</h1>
    </section>
);

export default Logistics;