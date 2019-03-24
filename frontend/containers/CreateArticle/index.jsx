import React, {Component} from 'react';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import {connect} from 'react-redux';
import {sendCreateArticleRequest} from '../../actions/createArticleActions';

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      descr: '',
      body: '',
      category: 'movies'
    };
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendRequest({...this.state});
  }

  _handleChange = (val, name) => {
    this.setState({[name]: val});
  }

  render() {
    let {
      title,
      descr,
      body,
      category
    } = this.state;

    let {
      isShowSuccessMessage,
      isShowErrorMessage
    } = this.props;

    return (
      <div className="article-create">
        <div className='wrapper'>
          <form onSubmit={this._handleSubmit}>
            <fieldset>
              <legend>Создание новой статьи</legend>
              <Input
                value={title}
                name='title'
                placeholder='Название статьи'
                onChange={this._handleChange}
                autoFocus
                required
              /><br /><br />
              <Input
                value={descr}
                name='descr'
                placeholder='Краткое описание статьи'
                onChange={this._handleChange} 
                required
              /><br /><br />
              <TextArea
                value={body}
                name='body'
                placeholder='Тело статьи'
                onChange={this._handleChange}
                required
              /><br /><br />
              <b>Укажите категорию статьи: </b> 
              <Select
                value={category}
                name='category'
                onChange={this._handleChange}
                options={['movies', 'politics', 'economics', 'cooking', 'other']}
              /><br /><br />
              <Input value='submit' type='submit' />
            </fieldset>
          </form>
          <br /><br />
          {isShowSuccessMessage && <span style={{color: 'green'}}>Статья успешно создана</span>}
          {isShowErrorMessage && <span style={{color: 'darkred'}}>Что-то пошло не так, попробуйте повторить операцию заново</span>}
        </div>
      </div>
    );
  }
}

CreateArticle.displayName = 'CreateArticle';

const mapStateToProps = ({createArticleReducer}) => ({
  isShowSuccessMessage: createArticleReducer.isShowSuccessMessage,
  isShowErrorMessage: createArticleReducer.isShowErrorMessage
});

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (data) => dispatch(sendCreateArticleRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);