import React from 'react';
import {connect} from 'react-redux';
import LoginPage from '../LoginPage';
import ArticlesList from '../../components/ArticlesList';
import {fetchAllArticles} from '../../actions/articlesActions';

import {css} from 'linaria';
import {sizes} from '../../constants/styles/common';

const delimiter = css`
  height: 1px;
  background: #ccc;
  margin: ${sizes.grid * 6}px 0;
`;

class StartPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.articles) {
      if (!this.props.articles.length) this.props.fetchArticles();
    }
  }

  render() {
    let {
      articles,
      loading
    } = this.props;

    return <div className='wrapper'>
      <LoginPage />
      <div className={delimiter} />
      {loading ? <span>...loading</span> : <ArticlesList items={articles} />}
    </div>
  }
}

const mapStateToProps = ({articlesReducer}) => ({
  articles: articlesReducer.data,
  loading: articlesReducer.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchAllArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);