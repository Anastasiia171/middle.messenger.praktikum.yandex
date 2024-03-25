import Block from '../../tools/Block';
import './chat-item.css';

import ChatItemRaw from './chat-item.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class ChatItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return ChatItemRaw;
  }
}
