import React from 'react';
import {Col, Card, CardTitle, CardText} from 'reactstrap';

export default function Symbol({name, removeSymbol}) {
  return (
    <Col xs="6" className="my-3">
      <Card body>
        <CardText
          className="text-right"
          onClick={e => {
            removeSymbol(name);
          }}>
          <img className="trash" src="/static/trash.svg" />
        </CardText>
        <CardTitle className="text-center py-4 display-3">{name}</CardTitle>
      </Card>
    </Col>
  );
}
