import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchArticleById} from '../../actions/articlesActions';
import {
  articleTitle,
  articleDescr,
  articleBody,
  articleCategory,
  articleCreator,
  articlePageWrapper,
  articlePageContainer
} from './style';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.data) {
      this.props.fetchArticle(this.props.match.params.articleId);
    }
  }

  render() {
    let {
      data,
      match
    } = this.props;

    if (!data) {
      return <div className='wrapper'>No data for {match.params.articleId} article</div>;
    }

    let {
      data: {
        title,
        descr,
        body,
        category,
        date,
        login
      }
    } = this.props;

    return (
      <div className={articlePageContainer}>
        <div className='wrapper'>
          <Link to='/'>Вернуться на главную</Link>
          <div className={articlePageWrapper}>
            <h2 className={articleTitle}>{title}</h2>
            <div className={articleDescr}>{descr}</div>
            <div className={articleBody}>{body}</div>
            <div className={articleCategory}>{category}</div>
            {/* <div>created at: {dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}</div> */}
            <div className={articleCreator}>created by {login}</div>
          </div>
        </div>
      </div>
    );
  }
}

ArticlePage.displayName = 'ArticlePage';

const mapStateToProps = ({ articlesReducer }, { match }) => ({
  data: articlesReducer.data.find(article => article.title === match.params.articleId) ||
    articlesReducer.singleData || null
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticleById(id))
});

const ConnectedArticlePage = connect(mapStateToProps, mapDispatchToProps)(ArticlePage);

export { ConnectedArticlePage };