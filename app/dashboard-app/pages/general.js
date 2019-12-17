import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KPI from '../components/KPI';
import TrendChart from '../components/Chart/TrendChart';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
import metadataService from '../services/metadataService';
import financesService from '../services/financesService';
import purchasesService from '../services/purchasesService';
import salesService from '../services/salesService';

// Importing a local CSS file.
import '../assets/css/style.css';

class General extends React.Component {
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

      const data = [
        await salesService.getMetrics(fiscalYear),
        await purchasesService.getMetrics(fiscalYear),
        await financesService.getMetrics(fiscalYear),
      ];
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

    const fiscalYearSelect = (
      <Row className="justify-content-center top-padded-row side-padded-row-small">
        <Col lg={2} className="offset-md-11">
          <FiscalYearSelect onChange={this.onChangeFiscalYear} />
        </Col>
      </Row>
    );

    const page = [fiscalYearSelect];

    if (this.state.hasError) {
      page.push(<ErrorMessage message={this.state.errorMessage} />);
      return page;
    }

    if (!this.state.data || this.state.loading) return page;

    const content = (
      <div>
        <div>
          <Row className="justify-content-center top-padded-row side-padded-row-small">
            <Col lg={3} className="text-center">
              <KPI title="Sales value" value={`${data[0].totalSalesNetValue.toLocaleString()} €`} />
            </Col>
            <Col lg={3} className="text-center">
              <KPI title="Purchases value" value={`${data[1].totalPurchasesValue.toLocaleString()} €`} />
            </Col>
            <Col lg={3} className="text-center">
              <KPI title="Total Income" value={`${data[2].totalIncome.toLocaleString()} €`} />
            </Col>
            <Col lg={3} className="text-center">
              <KPI title="Inventory Value" value="[VALUE]" />
            </Col>
          </Row>
          <Row className="justify-content-center top-padded-row side-padded-row-small">
            <Col lg={6} className="text-center">
              <TrendChart
                legend="Sales trend Value"
                data={this.state.data[0].salesTrend}
              />
            </Col>
            <Col lg={6} className="text-center">
              <TrendChart
                legend="Purchases trend Value"
                data={this.state.data[1].purchasesTrend}
              />
            </Col>
          </Row>
          <Row className="justify-content-center top-padded-row side-padded-row-small">
            <Col lg={6} className="text-center">
              <TrendChart
                legend="Income Trend Value"
                data={this.state.data[2].incomeTrend}
              />
            </Col>
          </Row>
        </div>
      </div>
    );

    page.push(content);

    return page;
  }
}
export default General;
