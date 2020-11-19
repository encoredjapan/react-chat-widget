import React, { Component } from 'react';

import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  toggleMsgLoader,
  addLinkSnippet,
  toggleWidget,
} from '../index';
import { addUserMessage } from '..';

const send = require('../assets/send_button.svg') as string;

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
    addLinkSnippet({ link: 'https://google.com', title: 'Google' });
    addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');

    toggleWidget();
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  handleSubmit = (msgText: string) => {
    if(msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
    return true;
  }

  getCustomLauncher = (param) =>
    <button onClick={param.toggle}>{JSON.stringify(param)}</button>

  getCustomSendButton = ({ buttonAlt }) =>
    <>
      <h4>{"WoW"}</h4>
      <img src={send} className="rcw-send-icon" alt={buttonAlt} />
    </>

  render() {
    return (
      <div>
        <button style={{position: 'absolute', right: 40, bottom: 150}}>test</button>
        <Widget
          title="Bienvenido"
          subtitle="Asistente virtual"
          senderPlaceHolder="Escribe aquí ..."
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          autofocus={false}
          timestampFormat="HH:mm"
          imagePreview
          handleSubmit={this.handleSubmit}
          launcher={this.getCustomLauncher}
          sendButton={this.getCustomSendButton}
        />
      </div>
    );
  }
}
