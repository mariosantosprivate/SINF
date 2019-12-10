import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/Header';
import TrendChart from '../components/Chart/TrendChart';
import BarChart from '../components/Chart/BarChart';
import PieChart from '../components/Chart/PieChart';
import KPI from '../components/KPI';
import salesService from '../services/salesService';
import metadataService from '../services/metadataService';
import chartTypes from '../utils/chartTypes';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
// Importing a local CSS file.
import '../assets/css/style.css';

class Sales extends React.Component {
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
    } catch (err) {
      this.setState({ hasError: true, errorMessage: err.message });
    }

    try {
      const data = await salesService.getMetrics(fiscalYear);
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
        <Header>
          <FiscalYearSelect onChange={this.onChangeFiscalYear} />
        </Header>
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
          <Col lg={12} className="text-center">
            <KPI title="Sales value" value={`${data.totalSalesNetValue.toLocaleString()} €`} />
          </Col>
        </Row>
        <Row className="text-center center-content top-padded-row side-padded-row">
          <Col className="text-center w-50">
            <BarChart
              data={data.topSoldProducts.map((product) => product.value)}
              labels={data.topSoldProducts.map((product) => product.name)}
              legend="Top 5 sold products"
            />
          </Col>
          <Col className="text-center w-50">
            <BarChart
              data={data.topCustomers.map((customer) => customer.value)}
              labels={data.topCustomers.map((customer) => customer.name)}
              legend="Top 5 customers"
            />
          </Col>
        </Row>
        <Row className="justify-content-sm-center top-padded-row side-padded-row">
          <Col className="text-center">
            <TrendChart legend="Sales trend" data={this.state.data.salesTrend} />
          </Col>
          <Col className="text-center">
            <PieChart
              data={data.salesByRegion.map((region) => region.value)}
              labels={data.salesByRegion.map((region) => region.name)}
              chartType={chartTypes.EURO_CHART}
            />
          </Col>
        </Row>
      </div>
    );

    page.push(content);

    return page;
  }
}

export default Sales;
