import React from 'react';
import {useState, useEffect} from 'react';
import {subscribe, assign} from '../ipcRedis';
import {Body, Server, IntegrationList} from '../components';
import {Col, Button} from 'reactstrap';
import {exec} from '../ipcBot';
import {save} from '../ipcElastic';

export default function App() {
  const [config, setConfig] = useState({});
  const [status, setStatus] = useState({});
  useEffect(() => {
    return subscribe('getConfig', assign(config, setConfig));
  }, []);
  useEffect(
    () => {
      if (status.data) {
        save(status.data, 'symbols', setStatus);
      }
    },
    [status]
  );
  return (
    <Body>
      <Col xs="12" className="my-4">
        <Button
          color="success"
          onClick={() => {
            exec('yahoo', config, setStatus);
          }}
          className="w-100 btn-rounded">
          Start server
        </Button>
      </Col>
      Status is {JSON.stringify(status)}
      <br />
      {JSON.stringify(config)}
      <Server />
      <div className="divider w-100" />
      <IntegrationList />
    </Body>
  );
}
