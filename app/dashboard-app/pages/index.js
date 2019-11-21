import Navbar from '../components/Navbar'
import '../scss/style.scss';
import Head from 'next/head'

const Index = () => (
    <section>
        <Head>
            <title>Next JS - Home</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar/>
        <h1>Hello World from Next JS</h1>
    </section>
);

export default Index;