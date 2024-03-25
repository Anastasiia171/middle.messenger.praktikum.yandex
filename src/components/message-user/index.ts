import Block from '../../tools/Block';
import './message-user.css';

import MessageUserRaw from './message-user.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class MessageUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('event'),
      },
    });
  }

  render() {
    return MessageUserRaw;
  }
}
