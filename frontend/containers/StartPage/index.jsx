import React from 'react';
import {connect} from 'react-redux';
import LoginPage from '../LoginPage';
import ArticlesList from '../../components/ArticlesList';
import {fetchAllArticles} from '../../actions/articlesActions';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.articles.length) this.props.fetchArticles();
  }

  render() {
    let {
      articles,
      loading
    } = this.props;

    return <>
      <LoginPage /><br /><br />
      {loading ? <span>...loading</span> : <ArticlesList items={articles} />}
    </>
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