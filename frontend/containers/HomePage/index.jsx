import React, { Component } from "react";
import Input from '../../components/Input';
import { connect } from 'react-redux';
import Socket from '../../core/socket';
import { getChatMessages } from '../../actions/socketActions';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  _onChange = (inputValue) => {
    this.setState({ inputValue });
  }

  _handleSubmit = (e) => {
    let { inputValue } = this.state;
    let { userLogin } = this.props;
    e.preventDefault();

    Socket.sendMessage({
      userLogin,
      message: inputValue
    });

    this.setState({ inputValue: '' });
  }

  componentDidMount() {
    if (!this.props.comments.length) this.props.getChatMessages();
  }

  render() {
    let { inputValue } = this.state;

    let {
      userLogin,
      comments,
      commentsLoading
    } = this.props;

    return (
      <div className='wrapper'>
        <h1>Hello, {userLogin}</h1>

        <Link to='create-article'>Перейти на страницу созданиия статей</Link>

        <form onSubmit={this._handleSubmit}>
          <Input value={inputValue} onChange={this._onChange} />
          <Input type='submit' value='submit' />
        </form>

        {
          commentsLoading ? (
            <div>...comments loading</div>
          ) : (
              <ul>
                {
                  comments.map(({ userLogin, message, date }, index) => (
                    <li key={index.toString()}><b>{userLogin}: </b>{message}: {dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}</li>
                  ))
                }
              </ul>
            )
        }
      </div>

    );
  }
}

const mapStateToProps = ({ loginReducer, socketReducer }) => ({
  userLogin: loginReducer.authUserLogin,
  comments: socketReducer.comments,
  commentsLoading: socketReducer.commentsLoading
});

const mapDispatchToProps = (dispatch) => ({
  getChatMessages: () => dispatch(getChatMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);