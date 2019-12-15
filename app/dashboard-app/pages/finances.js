import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TrendChart from '../components/Chart/TrendChart';
import BarChart from '../components/Chart/BarChart';
import PieChart from '../components/Chart/PieChart';
import KPI from '../components/KPI';
import financesService from '../services/financesService';
import metadataService from '../services/metadataService';
import chartTypes from '../utils/chartTypes';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
// Importing a local CSS file.
import '../assets/css/style.css';

class Finances extends React.Component {
  constructor(_props) {
    super(_props);

    this.state = {
      data: null,
      loading: false,
      hasError: false,
      errorMessage: null
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

      const data = await financesService.getMetrics(fiscalYear);
      this.setState({
        loading: false,
        data,
        hasError: false,
        errorMessage: null
      });
    } catch (err) {
      this.setState({ hasError: true, errorMessage: err.message });
    }
  }

  render() {
    const { data } = this.state;

    const fiscalYearSelect = (
      <Row className='justify-content-center top-padded-row side-padded-row-small'>
        <Col lg={2} className='offset-md-11'>
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
          <Row className='justify-content-center top-padded-row side-padded-row-small'>
            <Col lg={4} className='text-center'>
              <KPI
                title='Total Revenue'
                value={`${data.totalRevenue.toLocaleString()} €`}
              />
            </Col>
            <Col lg={4} className='text-center'>
              <KPI
                title='Total Income'
                value={`${data.totalIncome.toLocaleString()} €`}
              />
            </Col>
            <Col lg={4} className='text-center'>
              <KPI
                title='Total Expenses'
                value={`${-data.totalExpenses.toLocaleString()} €`}
              />
            </Col>
          </Row>
          <Row className='justify-content-center top-padded-row side-padded-row-small'>
            <Col lg={12} className='text-center'>
              <KPI
                title='Total Assets Value'
                value={`${data.totalAssets.toLocaleString()} €`}
              />
            </Col>
          </Row>
          <Row className='justify-content-center top-padded-row side-padded-row-small'>
            <Col lg={6} className='text-center'>
              <KPI
                title='Accounts Payable'
                value={`${data.accountsPayable.toLocaleString()} €`}
              />
            </Col>
            <Col lg={6} className='text-center'>
              <KPI
                title='Accounts Receivable'
                value={`${data.accountsReceivable.toLocaleString()} €`}
              />
            </Col>
          </Row>
          <Row className='justify-content-center top-padded-row side-padded-row-small'>
            <Col lg={12} className='text-center'>
              <KPI
                title='Financial Autonomy'
                value={`${data.financialAutonomy.toLocaleString()} %`}
              />
            </Col>
          </Row>
          <Row className='justify-content-sm-center top-padded-row side-padded-row'>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Revenue trend'
                data={this.state.data.revenueTrend}
              />
            </Col>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Expenses trend'
                data={this.state.data.expensesTrend}
              />
            </Col>
          </Row>
          <Row className='justify-content-sm-center top-padded-row side-padded-row'>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Income trend'
                data={this.state.data.incomeTrend}
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

export default Finances;
