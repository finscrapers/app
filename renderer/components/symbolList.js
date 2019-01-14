import React from 'react';
import {useState, useEffect} from 'react';
import {subscribe, mutate} from '../ipcRedis';
import Symbol from './symbol';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function SymbolList() {
  const [newSymbol, setNewSymbol] = useState('');
  const [symbols, setSymbols] = useState([]);
  useEffect(() => {
    return subscribe('getSymbols', setSymbols);
  }, []);
  var symbolElems = symbols.map(symbol => {
    return (
      <Symbol
        key={symbol}
        name={symbol}
        removeSymbol={() => {
          mutate('removeSymbol', symbol);
        }}
      />
    );
  });
  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          mutate('addSymbol', newSymbol);
          setNewSymbol('');
        }}>
        <Row className="my-4">
          <Col xs="12">
            <Label for="symbol">Enter Symbol</Label>
          </Col>
          <Col xs="10" className="pr-1">
            <FormGroup>
              <Input
                type="text"
                id="symbol"
                value={newSymbol}
                placeholder="e.g. AAPL"
                onChange={e => {
                  setNewSymbol(e.target.value);
                }}
                size="md"
                className="input-outline"
              />
            </FormGroup>
          </Col>
          <Col xs="2" className="pl-1">
            <Button color="primary" className="btn-plus">
              +
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>{symbolElems}</Row>
    </div>
  );
}
