import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/Header';
import TrendChart from '../components/Chart/TrendChart';
import BarChart from '../components/Chart/BarChart';
import KPI from '../components/KPI';
import purchasesService from '../services/purchasesService';
// Importing a local CSS file.
import '../assets/css/style.css';

class Purchases extends React.Component {
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
    const data = await purchasesService.getMetrics(2019);
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
            <Col className="text-center">
              <KPI title="Purchases value" value={`${data.totalPurchasesValue.toLocaleString()} €`} />
            </Col>
            <Col className="text-center">
              <KPI title="Total purchase orders" value={data.totalPurchaseOrders} />
            </Col>
          </Row>
          <Row className="text-center center-content top-padded-row side-padded-row">
            <Col className="text-center w-50">
              <BarChart
                data={data.topSuppliers.map((supplier) => supplier.value)}
                labels={data.topSuppliers.map((supplier) => supplier.name)}
                legend="Top 5 suppliers"
              />
            </Col>
            <Col className="text-center w-50">
              <BarChart
                data={data.topPurchasedProducts.map((product) => product.value)}
                labels={data.topPurchasedProducts.map((product) => product.name)}
                legend="Top 5 purchased products"
              />
            </Col>
          </Row>
          <Row className="justify-content-sm-center top-padded-row side-padded-row">
            <Col className="text-center">
              <TrendChart legend="Purchases trend" data={this.state.data.purchasesTrend} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Purchases;
