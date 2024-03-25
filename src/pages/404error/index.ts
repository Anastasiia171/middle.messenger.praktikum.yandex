import Block from '../../tools/Block';
import './404error.css';

import Error404PageRaw from './404error.hbs?raw';

export class Error404Page extends Block {
  constructor() {
    super({});
  }

  override render() {
    return Error404PageRaw;
  }
}
