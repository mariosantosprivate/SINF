// Importing a local CSS file.
import "../assets/css/app.css";
import Header from "../components/Header/Header";
import { TestChart } from "../components/Chart/TestChart";

const Index = () => (
    <div>
        <Header />
        <p>Hello Next.js</p>
        <TestChart/>
    </div>
)
export default Index