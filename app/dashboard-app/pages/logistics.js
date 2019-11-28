import Header from "../components/Header/Header";
import { DoughnutGraph } from "../components/Chart/DoughnutGraph";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Importing a local CSS file.
import "../assets/css/style.css";

const Logistics = () => (
    <div>
        <Header />
        <div>
            <Row className="justify-content-center top-padded-row side-padded-row-small">
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Inventory Value</Card.Title>
                            <Card.Text>
                                [VALUE]
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Average Inventory Period</Card.Title>
                            <Card.Text>
                                [VALUE]
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Inventory Turnover</Card.Title>
                            <Card.Text>
                                [VALUE]
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Deliveries</Card.Title>
                            <Card.Text>
                                [VALUE]
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="text-center center-content top-padded-row side-padded-row">
                <Col className="text-center w-50">
                    <DoughnutGraph />
                </Col>
                <Col className="text-center w-50">
                    <DoughnutGraph />
                </Col>
            </Row>
        </div>
    </div>
)
export default Logistics