import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header/Header';
import { BarGraph } from '../components/Chart/BarGraph';
import { DoughnutGraph } from '../components/Chart/DoughnutGraph';
import { LineGraph } from '../components/Chart/LineGraph';
import KPI from '../components/KPI';
import salesService from '../services/salesService';
// Importing a local CSS file.
import '../assets/css/style.css';

class Sales extends React.Component {
  constructor(_props) {
    super(_props);

    this.state = {
      data: null,
      loading: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });
    const data = await salesService.getMetrics(2016);
    this.setState({ loading: false, data });
  }

  render() {
    if (!this.state.data) return null;

    if (this.state.loading) return 'Loading...';

    const { data } = this.state;

    return (
      <div>
        <Header />
        <div>
          <Row className="justify-content-center top-padded-row side-padded-row-small">
            <Col lg={12} className="text-center">
              <KPI title="Sales value" value={`${data.totalSalesNetValue.toLocaleString()} €`} />
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
  }
}

export default Sales;
