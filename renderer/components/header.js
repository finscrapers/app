import React from 'react';
import {withRouter} from 'next/router';
import Link from 'next/link';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';

const Header = ({router}) => {
  return (
    <Navbar color="primary" className="text-left" dark expand fixed="top">
      <Nav pills>
        <NavItem active={router.pathname === '/sources'}>
          <Link href="/sources">
            <NavLink>
              <img src="/static/database.svg" />
              Data Sources
            </NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/'}>
          <Link href="/">
            <NavLink>
              <img src="/static/money.svg" />
              Symbols
            </NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/feeds'}>
          <Link href="/feeds">
            <NavLink>
              <img src="/static/feed.svg" />
              Feeds
            </NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/explore'}>
          <Link href="/explore">
            <NavLink>
              <img src="/static/feed.svg" />
              Explore
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  router: PropTypes.object
};

export default withRouter(Header);
