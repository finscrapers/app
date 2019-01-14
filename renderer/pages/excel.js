import React from 'react';
import {Body, NavPanel} from '../components';
import {Row, Col, Button} from 'reactstrap';

export default function Excel() {
  return (
    <Body>
      <NavPanel href="/feeds" icon="excel.png" />
      <Row>
        <Col xs="12" className="py-4">
          <h3>How to integrate with Excel</h3>
        </Col>
        <Col xs="12">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
              allowFullScreen
            />
          </div>
        </Col>
        <Col xs="12 py-4">
          <Button color="primary" className="btn-rounded w-100">
            Download script
          </Button>
        </Col>
      </Row>
    </Body>
  );
}
