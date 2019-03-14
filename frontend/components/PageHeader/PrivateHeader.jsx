import React from 'react';
import {pageHeaderListItem} from './style';

export function PrivateHeader({exitAction, login}) {
  return <>
    <li className={pageHeaderListItem}>{login}</li>
    <li className={pageHeaderListItem} onClick={exitAction}>disconnect</li>
  </>;
}

PrivateHeader.displayName = 'PrivateHeader';