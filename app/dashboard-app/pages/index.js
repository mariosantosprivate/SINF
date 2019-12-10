import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BarGraph } from '../components/Chart/BarGraph';
import { LineGraph } from '../components/Chart/LineGraph';
// Importing a local CSS file.
import '../assets/css/style.css';

const Index = () => (
  <div>
    <container className="home">
      <h1 className="index-h1">
        Welcome to Dash 360
    </h1>
    <h2 className="index-h2">
        SIGN UP OR SIGN IN TO CONTINUE 
    </h2>
    </container>
  </div>

);
export default Index;
