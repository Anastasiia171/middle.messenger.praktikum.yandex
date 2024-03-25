import Block from '../../tools/Block';
import './message-item.css';

import MessageItemRaw from './message-item.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class MessageItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('event'),
      },
    });
  }

  render() {
    return MessageItemRaw;
  }
}
