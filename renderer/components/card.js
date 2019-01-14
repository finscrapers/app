import React from 'react';
import {Col} from 'reactstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

const FsCard = ({logo, href}) => {
  return (
    <Col xs="6">
      <Link href={href}>
        <a className="card text-center py-5">
          <div className="card-body">
            <img src={`/static/${logo}`} />
          </div>
        </a>
      </Link>
    </Col>
  );
};

FsCard.propTypes = {
  logo: PropTypes.string,
  href: PropTypes.string
};

export default FsCard;
