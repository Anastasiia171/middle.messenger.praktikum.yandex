import Block from '../../tools/Block';
import './input-message.css';

import InputMessageRaw from './input-message.hbs?raw';

interface Props {
  [key: string]: unknown;
 }
export class InputMessage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {

        submit: () => console.log('submit message'),

      },

    });
  }

  render() {
    return InputMessageRaw;
  }
  // for future
  // validate(e) {
  //   e.preventDefault();
  //   const { name, value } = this.props;
  //   console.log(name);
  //   const rule = validationRules[name];
  //   if (!rule.test(value)) {
  //     console.error(`Ошибка: значение поля ${name} невалидно.`);
  //   } else {
  //     console.log(`Поле ${name} валидно.`);
  //   }
  // }
}
