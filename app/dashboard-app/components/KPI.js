import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const KPI = ({ title, value }) => (
  <Card style={{ width: '18rem' }} className="center-card">
    <Card.Body>
      <Card.Title>{ title }</Card.Title>
      <Card.Text>{ value }</Card.Text>
    </Card.Body>
  </Card>
);

KPI.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default KPI;
