import React from 'react';
import {
  pageHeader,
  pageHeaderList,
} from './style';

export {PrivateHeader} from './PrivateHeader';
export {PublicHeader} from './PublicHeader';

export function PageHeader({children}) {
  return (
    <div className={pageHeader}>
      <div className='wrapper'>
        <ul className={pageHeaderList}>
          {children}
        </ul>
      </div>
    </div>
  )
}

PageHeader.displayName = 'PageHeader';