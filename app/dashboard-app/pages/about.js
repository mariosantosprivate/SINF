import Navbar from '../components/Navbar'
import Head from 'next/head'

const About = () => (
    <section>
        <Head>
            <title>Next JS - About</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar />
        <h1>About Next JS</h1>
    </section>
);

export default About;