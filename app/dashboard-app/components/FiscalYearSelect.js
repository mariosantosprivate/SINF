import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import metadataService from '../services/metadataService';

class FiscalYearSelect extends React.Component {
  constructor(_props) {
    super(_props);

    this.state = {
      data: null,
      loading: false,
      selectedYear: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onChange(event) {
    this.props.onChange(event);

    this.setState({ selectedYear: Number(event) });
  }

  async fetchData() {
    this.setState({ loading: true });
    const data = await metadataService.getFiscalYears();
    this.setState({ loading: false, data, selectedYear: data[0] });
  }


  render() {
    if (!this.state.data || this.state.loading) return null;

    return (
      <Dropdown onSelect={this.onChange}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {this.state.selectedYear}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.data.map((fiscalYear) => (
            <Dropdown.Item
              active={fiscalYear === this.state.selectedYear}
              key={fiscalYear}
              eventKey={fiscalYear}
            >
              {fiscalYear}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

FiscalYearSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FiscalYearSelect;
