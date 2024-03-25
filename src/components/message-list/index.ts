import Block from '../../tools/Block';
import { MessageItem } from '../message-item';
import './message-list.css';

import MessageListRaw from './message-list.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class MessageList extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('event'),
      },
      messageItems: [
        new MessageItem({ isUserMessage: 'true', text: 'прив', timestamp: '11:11' }),
        new MessageItem({ text: 'прив', timestamp: '11:11' }),
      ],
    });
  }

  render() {
    return MessageListRaw;
  }
}
