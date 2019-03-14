import React from 'react';
import { Link } from 'react-router-dom';
import {pageHeaderListItem} from './style';

export function PublicHeader() {
  return <>
    <li className={pageHeaderListItem}>
      <Link to='/register'>to register page</Link>
    </li>
    <li className={pageHeaderListItem}>
      <Link to='/'>to login page</Link>
    </li>
  </>;
}

PublicHeader.displayName = 'PublicHeader';