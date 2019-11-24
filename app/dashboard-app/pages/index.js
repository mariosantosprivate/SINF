import Head from "next/head";
import "../scss/style.scss";
import Navbar from "../components/Navbar";

const Index = () => (
  <section className="page-section">
    <Head>
      <title>Dashboard - General</title>
    </Head>
    <Navbar />
      <h1>Hello World from index.js</h1>
  </section>
);

export default Index;
