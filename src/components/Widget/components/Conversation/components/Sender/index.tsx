import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';

const send = require('../../../../../../../assets/send_button.svg') as string;

import './style.scss';

type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  customSendButton?: AnyFunction;
  buttonAlt: string;
  onTextInputChange?: (event: any) => void;
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, customSendButton, buttonAlt }: Props) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // @ts-ignore
  useEffect(() => {
    const needFocus = showChat && autofocus;
    if (needFocus) {
      inputRef.current?.focus();
    }
  }, [showChat]);

  return (
    <form className="rcw-sender" onSubmit={sendMessage}>
      <input
        type="text"
        className="rcw-new-message"
        name="message"
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        autoComplete="off"
        onChange={onTextInputChange}
      />
      <button type="submit" className="rcw-send">
      {customSendButton ?
        customSendButton({
          buttonAlt,
        }) :
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      }
      </button>
    </form>
  );
}

export default Sender;
