import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header/Header';
import { BarGraph } from '../components/Chart/BarGraph';
import { DoughnutGraph } from '../components/Chart/DoughnutGraph';
import { LineGraph } from '../components/Chart/LineGraph';
// Importing a local CSS file.
import '../assets/css/style.css';

const Sales = () => (
  <div>
    <Header />
    <div>
      <Row className="justify-content-center top-padded-row side-padded-row-small">
        <Col lg={12} className="text-center">
          <Card style={{ width: '18rem' }} className="center-card">
            <Card.Body>
              <Card.Title>Sales Value</Card.Title>
              <Card.Text>[VALUE]</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="text-center center-content top-padded-row side-padded-row">
        <Col className="text-center w-50">
          <BarGraph />
        </Col>
        <Col className="text-center w-50">
          <BarGraph />
        </Col>
      </Row>
      <Row className="justify-content-sm-center top-padded-row side-padded-row">
        <Col className="text-center">
          <LineGraph />
        </Col>
        <Col className="text-center">
          <DoughnutGraph />
        </Col>
      </Row>
    </div>
  </div>
);
export default Sales;
