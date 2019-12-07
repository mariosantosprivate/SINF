import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/Header';
import TrendChart from '../components/Chart/TrendChart';
import BarChart from '../components/Chart/BarChart';
import PieChart from '../components/Chart/PieChart';
import KPI from '../components/KPI';
import salesService from '../services/salesService';
import chartTypes from '../utils/chartTypes';
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
              <BarChart
                data={data.topSoldProducts.map((product) => product.totalSoldValue)}
                labels={data.topSoldProducts.map((product) => product.name)}
                legend="Top 5 sold products"
              />
            </Col>
            <Col className="text-center w-50">
              <BarChart data={[1, 2, 3, 4]} labels={['Hey', 'Vsauce', 'Michael', 'Here']} legend="VSAUCEEE" />
            </Col>
          </Row>
          <Row className="justify-content-sm-center top-padded-row side-padded-row">
            <Col className="text-center">
              <TrendChart legend="Sales trend" data={this.state.data.salesTrend} />
            </Col>
            <Col className="text-center">
              <PieChart data={[1, 2, 3, 4, 5]} labels={['Hey', 'Vsauce', 'Michael', 'Here', 'Again']} chartType={chartTypes.PERCENTAGE_CHART} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Sales;
