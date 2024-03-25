import Block from '../../tools/Block';
import { ChatItem } from '../chat-item';
import './chat-sidebar.css';

import ChatSidebarRaw from './chat-sidebar.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class ChatSidebar extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('click'),
      },
      chatItems: [
        new ChatItem({ name: 'Галочка', lastMessage: 'ой бой', unreadCount: '4' }),
        new ChatItem({ name: 'Петя', lastMessage: 'прив', unreadCount: '1' }),
      ],
    });
  }

  render() {
    return ChatSidebarRaw;
  }
}
