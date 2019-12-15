import Card from 'react-bootstrap/Card';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import chartTypes from '../utils/chartTypes';
import PieChart from '../components/Chart/PieChart';
import TrendChart from '../components/Chart/TrendChart';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
import metadataService from '../services/metadataService';
import Button from 'react-bootstrap/Button';
import { BarGraph } from '../components/Chart/BarGraph';
import { LineGraph } from '../components/Chart/LineGraph';
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

      const data = [
        await salesService.getMetrics(fiscalYear),
        await purchasesService.getMetrics(fiscalYear),
        await financesService.getMetrics(fiscalYear)
      ];
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
            <Col lg={6} className='text-center'>
              <Card style={{ width: '18rem' }} className='center-card'>
                <Card.Body>
                  <Card.Title>Sales Value</Card.Title>
                  <Card.Text>{this.state.data[0].totalSalesNetValue}</Card.Text>
                  <Button variant='primary'>Go to Sales</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Sales trend Value'
                data={this.state.data[0].salesTrend}
              />
            </Col>
            <Col lg={6} className='text-center'>
              <Card style={{ width: '18rem' }} className='center-card'>
                <Card.Body>
                  <Card.Title>Purchases Value</Card.Title>
                  <Card.Text>
                    {this.state.data[1].totalPurchasesValue}
                  </Card.Text>
                  <Button variant='primary'>Go to Purchases</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Purchases trend Value'
                data={this.state.data[1].purchasesTrend}
              />
            </Col>
            <Col lg={6} className='text-center'>
              <Card style={{ width: '18rem' }} className='center-card'>
                <Card.Body>
                  <Card.Title>Total Income</Card.Title>
                  <Card.Text>{this.state.data[2].totalIncome}</Card.Text>
                  <Button variant='primary'>Go to Finances</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className='text-center'>
              <TrendChart
                legend='Income Trend Value'
                data={this.state.data[2].incomeTrend}
              />
            </Col>
            <Col className='text-center'>
              <Card style={{ width: '18rem' }} className='center-card'>
                <Card.Body>
                  <Card.Title>Inventory Value</Card.Title>
                  <Card.Text>[VALUE]</Card.Text>
                  <Button variant='primary'>Go to Logistics</Button>
                </Card.Body>
              </Card>
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
