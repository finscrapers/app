import React from 'react';
import {Row, Col} from 'reactstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function NavPanel({href, icon}) {
  return (
    <Row className="align-items-center gray-300-bg">
      <Col xs={{size: 2}} className="text-center py-4">
        <Link href={href}>
          <a>
            <img
              src="/static/arrow-back.svg"
              alt="back"
              style={{height: '40px'}}
            />
          </a>
        </Link>
      </Col>
      <Col xs="8" className="text-center">
        <img
          src={`/static/${icon}`}
          alt={icon}
          style={{width: '99px', height: '100%'}}
        />
      </Col>
      <div className="divider w-100" />
    </Row>
  );
}

NavPanel.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string
};
