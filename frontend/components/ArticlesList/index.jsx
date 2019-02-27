import React from 'react';
import dayjs from 'dayjs';

function ArticlesList({items}) {
  return (
    <>
      <h2>Список статей: </h2>
      <ul>
      {
        items.map(({title, descr, body, category, date, login}, index) => (
          <li key={index.toString()}>
            <div>article title is : {title}</div>
            <div>article description is: {descr}</div>
            <div>article body is : {body}</div>
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