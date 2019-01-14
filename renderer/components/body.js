import React from 'react';
import Header from './header';
import {Container} from 'reactstrap';
import '../styles/styles.css';

export default function Body(props) {
  const {...attributes} = props;
  return (
    <div>
      <Header />
      <Container fluid {...attributes} />
    </div>
  );
}
