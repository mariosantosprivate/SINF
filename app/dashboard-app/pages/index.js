import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BarGraph } from '../components/Chart/BarGraph';
import { LineGraph } from '../components/Chart/LineGraph';
import Container from 'react-bootstrap/Container';
// Importing a local CSS file.
import '../assets/css/style.css';

const Index = () => (
  <div className="home">
    <div className="homeLanding">
      <div className="background"></div>
      <div className="homeHeaders">
        <h1 className="index-h1">
          Welcome to Dash 360
        </h1>
        <h2 className="index-h2">
          Sign up to start using our services or sign in if you already have an account.
        </h2>
      </div>
      <div className="homeButtons">
        <Row className="justify-content-center">
          <Col>
            <Button variant="dark" size="lg" block>
              Sign in
            </Button>
          </Col>
          <Col>
            <Button variant="outline-secondary" size="lg" block>
              Sign up
          </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div className="homeFeatures">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>General</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Sales</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Purchases</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Finances</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Logistics</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  </div>
);
export default Index;
