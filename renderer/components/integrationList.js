import React from 'react';
import Card from './card';
import {Row, Col} from 'reactstrap';

export default function IntegrationList() {
  return (
    <Row className="my-4">
      <Col xs="12" className="pb-4">
        <h3>Integrations</h3>
      </Col>
      <Card logo="excel.png" href="/excel" className="w-100" />
    </Row>
  );
}
