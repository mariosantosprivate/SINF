import Header from "../components/Header/Header";
import { BarGraph } from "../components/Chart/BarGraph";
import { LineGraph } from "../components/Chart/LineGraph";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// Importing a local CSS file.
import "../assets/css/style.css";

const Finances = () => (
    <div>
        <Header />
        <div>
            <Row className="justify-content-center top-padded-row side-padded-row-small">
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Income</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Expenses</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Total Asset Value</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center top-padded-row side-padded-row-small">
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Accounts Payable</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Accounts Receivable</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card style={{ width: '18rem' }} className="center-card">
                        <Card.Body>
                            <Card.Title>Financial Autonomy</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
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
                    <LineGraph />
                </Col>
            </Row>
        </div>
    </div>
)
export default Finances