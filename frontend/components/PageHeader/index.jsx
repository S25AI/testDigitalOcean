import React from 'react';
import { Link } from 'react-router-dom';
import {
  pageHeader,
  pageHeaderList,
  pageHeaderListItem
} from './style';

export function PageHeader({items}) {
  return (
    <div className={pageHeader}>
      <div className='wrapper'>
        <ul className={pageHeaderList}>
          {
            items.map(({url, text}, index) => (
              <li key={index.toString()} className={pageHeaderListItem}>
                <Link to={url}>{text}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

PageHeader.displayName = 'PageHeader';