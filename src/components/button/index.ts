import Block from '../../tools/Block';
import './button.css';

import ButtonRaw from './button.hbs?raw';

interface Props {
  [key: string]: unknown;
 }
export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();

          if (props.submit) {
            const submit = props.submit as (event: SubmitEvent) => void;
            submit(e);
          }
        },
      },
    });
  }

  render() {
    return ButtonRaw;
  }
}
