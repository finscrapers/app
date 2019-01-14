import React from 'react';
import {useState, useEffect} from 'react';
import {subscribe, mutate} from '../ipcRedis';
import {Body, NavPanel} from '../components';
import {
  Row,
  Col,
  Form,
  Alert,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
const model = {headless: 'BOOLEAN', sloMo: 'INT'};

export default function Yahoo() {
  const [browser, setBrowser] = useState({});
  const [error, setError] = useState();
  useEffect(() => {
    return subscribe('getBrowser', setBrowser, model);
  }, []);
  return (
    <Body>
      <NavPanel href="/sources" icon="yahoo.png" />
      {error && (
        <Alert color="danger" className="my-3">
          {error}
        </Alert>
      )}
      <Form>
        <Row className="my-4">
          <Col xs={{size: 10, offset: 1}}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  value={browser.headless || false}
                  onChange={() => {
                    mutate('setBrowser', {
                      sloMo: browser.sloMo,
                      headless: !browser.headless
                    });
                  }}
                />
                &nbsp;&nbsp;&nbsp;Headless mode
              </Label>
            </FormGroup>
          </Col>
          <Col xs={{size: 10, offset: 1}} className="my-5">
            <FormGroup>
              <Label for="time-lack">Time lack (in ms)</Label>
              <Input
                type="text"
                value={browser.sloMo || 0}
                id="time-lack"
                size="md"
                onChange={e => {
                  mutate(
                    'setBrowser',
                    {
                      sloMo: e.target.value,
                      headless: browser.headless
                    },
                    model
                  ).then(setError, e => {
                    setError(e);
                  });
                }}
                className="input-outline"
              />
            </FormGroup>
          </Col>
          <div className="w-100" />
          <Col xs={{size: 10, offset: 1}}>
            <Button color="primary" className="btn-rounded w-100">
              Download script
            </Button>
          </Col>
        </Row>
      </Form>
    </Body>
  );
}
