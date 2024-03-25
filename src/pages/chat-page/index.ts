import {
  ProfileSettings, InputSearch, ChatSidebar, MessageUser, MessageList, InputMessage,
} from '../../components';
import Block from '../../tools/Block';
import { submit } from '../../tools/formUtils';
import { ComponentsName } from '../../tools/validationRules';
import './chat-page.css';

import ChatPageRaw from './chat-page.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class ChatPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      profile: [
        new ProfileSettings({
          className: 'profile-settings',
        })],
      inputsearch: [
        new InputSearch({
          className: 'search-container',
        })],
      sidebar: [
        new ChatSidebar({})],
      user: [
        new MessageUser({
          userName: 'Петя',
        })],
      list: [
        new MessageList({})],
      inputmessage: [
        new InputMessage({ type: 'submit', submit, name: ComponentsName.MESSAGE })],

    });
  }

  override render() {
    return ChatPageRaw;
  }
}
