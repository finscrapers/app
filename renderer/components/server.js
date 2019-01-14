import React from 'react';
import {useState} from 'react';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Server() {
  const [port, setPort] = useState(3000);
  const address = `http://localhost:${port}`;
  return (
    <Form>
      <Row className="my-4">
        <Col xs="12">
          <Label for="port">Server Port:</Label>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Input
              type="text"
              className="input-outline"
              id="port"
              size="md"
              value={port}
              onChange={e => {
                setPort(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col xs="12">
          <Label for="port">Server address:</Label>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Input
              type="text"
              id="address"
              size="md"
              value={address}
              className="input-outline"
              disabled
            />
          </FormGroup>
        </Col>
        <Col xs="12">
          <Button color="danger" className="w-100 btn-rounded">
            Stop server
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
