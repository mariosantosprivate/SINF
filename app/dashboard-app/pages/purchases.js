import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TrendChart from '../components/Chart/TrendChart';
import BarChart from '../components/Chart/BarChart';
import KPI from '../components/KPI';
import purchasesService from '../services/purchasesService';
import metadataService from '../services/metadataService';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
// Importing a local CSS file.
import '../assets/css/style.css';

class Purchases extends React.Component {
  constructor(_props) {
    super(_props);

    this.state = {
      data: null,
      loading: false,
      hasError: false,
      errorMessage: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.onChangeFiscalYear = this.onChangeFiscalYear.bind(this);
  }

  componentDidMount() {
    this.fetchData(null);
  }

  async onChangeFiscalYear(event) {
    this.fetchData(event);
  }

  async fetchData(_fiscalYear) {
    let fiscalYear = _fiscalYear;

    this.setState({ loading: true });

    try {
      if (!fiscalYear) {
        const fiscalYears = await metadataService.getFiscalYears();
        [fiscalYear] = fiscalYears;
      }

      const data = await purchasesService.getMetrics(fiscalYear);
      this.setState({
        loading: false,
        data,
        hasError: false,
        errorMessage: null,
      });
    } catch (err) {
      this.setState({ hasError: true, errorMessage: err.message });
    }
  }

  render() {
    const { data } = this.state;

    const header = (
      <div>
        <FiscalYearSelect onChange={this.onChangeFiscalYear} />
      </div>
    );

    const page = [header];

    if (this.state.hasError) {
      page.push(<ErrorMessage message={this.state.errorMessage} />);
      return page;
    }

    if (!this.state.data || this.state.loading) return page;

    const content = (
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
    );

    page.push(content);

    return page;
  }
}

export default Purchases;
