import Header from "../components/Header/Header";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Importing a local CSS file.
import "../assets/css/style.css";

const Finances = () => (
    <div>
        <Header />
        <div>
            <Row className="justify-content-sm-center">
                <Col sm className="text-center">1 of 5</Col>
                <Col sm className="text-center">2 of 5</Col>
                <Col sm className="text-center">3 of 5</Col>
                <Col sm className="text-center">4 of 5</Col>
                <Col sm className="text-center">5 of 5</Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col sm className="text-center">1 of 3</Col>
                <Col sm className="text-center">2 of 3</Col>
                <Col sm className="text-center">3 of 3</Col>
            </Row>
            <Row className="text-center center-content">
                <Col sm className="text-center">1 of 2</Col>
                <Col sm className="text-center">2 of 2</Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col sm className="text-center">1 of 1</Col>
            </Row>
        </div>
    </div>
)
export default Finances