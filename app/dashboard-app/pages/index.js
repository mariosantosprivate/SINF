import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Link from "../components/Navbar/Link";
import { BarGraph } from '../components/Chart/BarGraph';
import { LineGraph } from '../components/Chart/LineGraph';
import Container from 'react-bootstrap/Container';
// Importing a local CSS file.
import '../assets/css/style.css';

export default class Index extends React.Component {

  render() {
    return (
      <div className="home">
    <div className="homeLanding">
      <div className="background"></div>
      <div className="homeHeaders">
        <h1 className="index-h1">
          Dashboard 360º
        </h1>
        <h2 className="index-h2">
          Sign up to start using our services or sign in if you already have an account.
        </h2>
        <hr></hr>
      </div>
      
      <div className="homeButtons">
      {!this.props.user && (
        <Row className="justify-content-center lg">
          <Col>
            <Link href="/login">
              <Button variant="dark" href="/login" size="lg" block>
                  Sign in
              </Button>
            </Link>
          </Col>
          <Col>
            <Link href="/login">
              <Button variant="warning" href="/login" size="lg" block>
                Sign up
              </Button>
            </Link>
          </Col>
        </Row>
        )}
      </div>
    </div>
    <div className="homeFeatures">
      <h2 className="homeFeatures-h2">
        FEATURES
      </h2>
      <hr className="small-hr"></hr>

      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/illustricon-tech-vii/512/big_data-512.png" />
            <Card.Body>
              <Card.Title>General</Card.Title>
              <Card.Text>
                The General Dashboard aggregates the most crucial information from the other dashboards so that you can quickly view it.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/illustricon-tech-vii/512/big_data-512.png" />
            <Card.Body>
              <Card.Title>Sales</Card.Title>
              <Card.Text>
                The Sales Dashboard allows to view all information regarding sales.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/illustricon-tech-vii/512/big_data-512.png" />
            <Card.Body>
              <Card.Title>Purchases</Card.Title>
              <Card.Text>
                The Purchases Dashboard allows to view all information regarding purchases.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/illustricon-tech-vii/512/big_data-512.png" />
            <Card.Body>
              <Card.Title>Finances</Card.Title>
              <Card.Text>
                The Finances Dashboard allows to view all information regarding finances.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/illustricon-tech-vii/512/big_data-512.png" />
            <Card.Body>
              <Card.Title>Logistics</Card.Title>
              <Card.Text>
                The Logistics Dashboard allows to view all information regarding logistics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  </div>
    )
  }
}
