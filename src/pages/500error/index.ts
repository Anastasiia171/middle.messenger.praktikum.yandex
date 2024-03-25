import Block from '../../tools/Block';
import './500error.css';

import Error500PageRaw from './500error.hbs?raw';

export class Error500Page extends Block {
  constructor() {
    super({});
  }

  override render() {
    return Error500PageRaw;
  }
}
