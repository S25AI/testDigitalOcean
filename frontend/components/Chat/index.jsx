import React, { Component } from "react";
import Input from '../Input';
import { connect } from 'react-redux';
import Socket from '../../core/socket';
import { getChatMessages } from '../../actions/socketActions';
import dayjs from 'dayjs';
import {css} from 'linaria';
import {sizes, colors} from '../../constants/styles/common';

const chat = css`
  margin-top: ${sizes.grid * 3}px;
  width: 540px;
  max-width: 100%;
  max-height: 800px;
  overflow-y: auto;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: ${sizes.grid * 2}px ${sizes.grid * 3}px;

  @media screen and (max-width: 415px) {
    padding-left: 0;
    padding-right: 0;
    max-height: auto;
    border-color: transparent;
  }
`;

const chatFormContainer = css`
  margin-bottom: ${sizes.grid * 2}px;
`;

const messageStyle = css`
  width: 400px;
  max-width: 100%;
  background: ${colors.dark};
  border-radius: 12px;
  color: ${colors.white};
  padding: ${sizes.grid * 2}px ${sizes.grid * 3}px ${sizes.grid * 4}px;
  position: relative;

  & + & {
    margin-top: ${sizes.grid * 2}px;
  }
`;

const messageTextStyle = css`
  font-size: 14px;
  line-height: 1.4;
  margin-top: ${sizes.grid}px;
`;

const messageUserStyle = css`
  font-size: 16px;
  font-weight: bold;
  color: darkcyan;
`;

const messageDateStyle = css`
  position: absolute;
  z-index: 1;
  bottom: ${sizes.grid}px;
  right: ${sizes.grid}px;
  font-size: ${sizes.base * 2}px;
`;

class Chat extends Component {
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
      comments,
      commentsLoading
    } = this.props;

    return (
      <div className={chat}>

        <div className={chatFormContainer}>
          <form onSubmit={this._handleSubmit}>
            <Input value={inputValue} onChange={this._onChange} />
            <Input type='submit' value='submit' />
          </form>
        </div>


        {
          commentsLoading ? (
            <div>...comments loading</div>
          ) : (
              <ul>
                {
                  comments.map(({ userLogin, message, date }, index) => (
                    <li className={messageStyle} key={index.toString()}>
                      <div className={messageUserStyle}>{userLogin}</div>
                      <div className={messageTextStyle}>{message}</div>
                      <div className={messageDateStyle}>
                        {dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}
                      </div>
                    </li>
                  ))
                }
              </ul>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ socketReducer, loginReducer }) => ({
  comments: socketReducer.comments,
  commentsLoading: socketReducer.commentsLoading,
  userLogin: loginReducer.authUserLogin
});

const mapDispatchToProps = (dispatch) => ({
  getChatMessages: () => dispatch(getChatMessages())
});

const EnchancedChat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export {EnchancedChat};
