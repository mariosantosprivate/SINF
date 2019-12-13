import React from 'react';
import { Row, Col } from 'react-bootstrap';
import KPI from '../components/KPI';
import PieChart from '../components/Chart/PieChart';
import logisticsService from '../services/logisticsService';
import metadataService from '../services/metadataService';
import FiscalYearSelect from '../components/FiscalYearSelect';
import ErrorMessage from '../components/ErrorMessage';
// Importing a local CSS file.
import '../assets/css/style.css';

class Logistics extends React.Component {
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

      const data = await logisticsService.getMetrics(fiscalYear);
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
        <Row className="justify-content-center top-padded-row side-padded-row-small">
          {/*<Col className="text-center">
            <KPI title="Inventory Value" value={`${data.totalinventaryValue.toLocaleString()} €`} /> 
          </Col>
          <Col className="text-center">
            <KPI title="Average Inventory Period" value={`${data.averageInventoryPeriod.toLocaleString()} €`} />
          </Col>
          <Col className="text-center">
            <KPI title="Inventory Turnovers" value={`${data.inventoryTurnovers.toLocaleString()} €`} />
    </Col> */}
          <Col className="text-center">
            <KPI title="Total Deliveries" value={`${data.totalDeliveries.toLocaleString()}`} />
          </Col>
        </Row>
        <Row className="justify-content-sm-center top-padded-row side-padded-row">
          <Col className="text-center">
            <PieChart
              data={data.deliveryStatus.map((status) => status.value)}
              labels={data.deliveryStatus.map((status) => status.name)}
            />
          </Col>
          <Col className="text-center">
            <PieChart
              data={data.deliveryByCountry.map((country) => country.value)}
              labels={data.deliveryByCountry.map((country) => country.name)}
            />
          </Col>
        </Row>
      </div>
    );

    page.push(content);

    return page;
  }
}

export default Logistics;