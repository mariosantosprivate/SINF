import { Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => (
  <div>
    <Row className="justify-content-center top-padded-row side-padded-row-small">
      <Col lg={12}>
        <Alert variant="danger">{props.message}</Alert>
      </Col>
    </Row>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
