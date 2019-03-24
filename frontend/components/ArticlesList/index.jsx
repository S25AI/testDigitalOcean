import React from 'react';
import dayjs from 'dayjs';

import {
  title,
  articlesList,
  articlesListItem,
  articleTitle,
  articleDescr,
  articleBody,
  articleCategory,
  articleCreator
} from './style';

function ArticlesList({items}) {
  if (!items) return null;
  return (
    <>
      <h2 className={title}>Список статей: </h2>
      <ul className={articlesList}>
      {
        items.map(({title, descr, body, category, date, login}, index) => (
          <li className={articlesListItem} key={index.toString()}>
            <div className={articleTitle}>{title}</div>
            <div className={articleDescr}>{descr}</div>
            <div className={articleBody}>{body}</div>
            <div className={articleCategory}>{category}</div>
            {/* <div>created at: {dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}</div> */}
            <div className={articleCreator}>created by {login}</div>
            <br />
          </li>
        ))
      }
      </ul>
    </>
  );
}

ArticlesList.displayName = 'ArticlesList';

export default ArticlesList;