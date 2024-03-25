import { Button, InputField } from '../../components';
import Block from '../../tools/Block';
import './login-page.css';

import LoginPageRaw from './login-page.hbs?raw';
import { submit } from '../../tools/formUtils';
import { ComponentsName } from '../../tools/validationRules';

interface Props {
  [key: string]: unknown;
 }

export class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      input_login:
        new InputField({
          title: 'Login',
          name: ComponentsName.LOGIN,
          id: 'login',
          type: 'text',
          onChange: (value: boolean) => {
            this.setProps({ isLoginError: value });
          },
        }),
      input_password:
        new InputField({
          className: 'login-page__input',
          title: 'Password',
          name: ComponentsName.PASSWORD,
          type: 'password',
          id: 'password',
          onChange: (value: boolean) => {
            this.setProps({ isPasswordError: value });
          },
        }),

      button_primary:
        new Button({
          text: 'Login',
          page: 'login',
          className: 'button-primary',
          type: 'submit',
          submit,
          id: 'login-button',
        }),
      button_secondary:
        new Button({
          text: 'Not registered yet?',
          page: 'login',
          className: 'button-secondary',
          id: 'register-button',
        }),

    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.isLoginError !== newProps.isLoginError) {
      this.children.input_login.setProps({ isError: newProps.isLoginError });
    }
    if (oldProps.isPasswordError !== newProps.isPasswordError) {
      this.children.input_password.setProps({ isError: newProps.isPasswordError });
    }
    return true;
  }

  override render() {
    return LoginPageRaw;
  }
}
