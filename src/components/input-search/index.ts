import Block from '../../tools/Block';
import './input-search.css';

import InputSearchRaw from './input-search.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class InputSearch extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('event'),
      },
    });
  }

  render() {
    return InputSearchRaw;
  }
}
