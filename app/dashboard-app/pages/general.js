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

        <div>
            <Row className="justify-content-center top-padded-row side-padded-row-small">
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Sales Value</Card.Title>
                            <Card.Text>[VALUE]</Card.Text>
                            <Button variant="primary">Go to Sales</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Purchases Value</Card.Title>
                            <Card.Text>[VALUE]</Card.Text>
                            <Button variant="primary">Go to Purchases</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>[VALUE]</Card.Text>
                            <Button variant="primary">Go to Finances</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Revenue Increase</Card.Title>
                            <Card.Text>[VALUE]</Card.Text>
                            <Button variant="primary">Go to Finances</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Inventory Value</Card.Title>
                            <Card.Text>[VALUE]</Card.Text>
                            <Button variant="primary">Go to Logistics</Button>
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
                <Col className="text-center w-50">
                    <LineGraph />
                </Col>
                <Col className="text-center w-50">
                    <LineGraph />
                </Col>
            </Row>
        </div>
    </div>
);
export default Index;