import InputRaw from './input.hbs?raw';
import Block from '../../tools/Block';
import { validate } from '../../tools/validate';
import { ComponentsName } from '../../tools/validationRules';

interface Props {
  [key: string]: unknown;
 }

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,

      events: {
        blur: (e: FocusEvent) => {
          const target = e.target as HTMLInputElement;
          const name = props.name as ComponentsName;
          const onChange = props.onChange as (arg: boolean) => void;

          const isValid = validate(name, target.value);
          if (isValid) {
            onChange(false);
          } else {
            onChange(true);
          }
        },
      },

    });
  }

  render() {
    return InputRaw;
  }
}
