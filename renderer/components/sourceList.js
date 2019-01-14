import React from 'react';
import Card from './card';
import {Row, Col} from 'reactstrap';

export default function SourceList() {
  return (
    <Row className="my-4">
      <Card logo="yahoo.png" href="/yahoo" className="w-100" />
    </Row>
  );
}
