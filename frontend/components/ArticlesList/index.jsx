import React from 'react';
import dayjs from 'dayjs';

import {
  title,
  articlesList,
  articlesListItem,
  articleTitle,
  articleDescr,
  articleBody
} from './style';

function ArticlesList({items}) {
  return (
    <>
      <h2 className={title}>Список статей: </h2>
      <ul className={articlesList}>
      {
        items.map(({title, descr, body, category, date, login}, index) => (
          <li className={articlesListItem} key={index.toString()}>
            <div className={articleTitle}>article title is : {title}</div>
            <div className={articleDescr}>article description is: {descr}</div>
            <div className={articleBody}>article body is : {body}</div>
            <div>article category is : {category}</div>
            <div>created at: {dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}</div>
            <div>created by: {login}</div>
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