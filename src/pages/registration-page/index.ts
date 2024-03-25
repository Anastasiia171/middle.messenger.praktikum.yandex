import { Button, InputField } from '../../components';
import Block from '../../tools/Block';
import { submit } from '../../tools/formUtils';
import { ComponentsName } from '../../tools/validationRules';
import './registration-page.css';

import RegistrPageRaw from './registration-page.hbs?raw';

interface Props {
  [key: string]: unknown;
 }

export class RegistrationPage extends Block {
  constructor(props: Props) {
    super({
      ...props,

      input_first_name:
        new InputField({
          title: 'First name',
          name: ComponentsName.FIRST_NAME,
          id: 'first_name',
          type: 'text',
          onChange: (value: boolean) => {
            this.setProps({ isFirstNameError: value });
          },
        }),
      input_second_name:
        new InputField({
          title: 'Second name',
          name: ComponentsName.SECOND_NAME,
          type: 'text',
          id: 'second_name',
          onChange: (value: boolean) => {
            this.setProps({ isSecondNameError: value });
          },
        }),
      input_email:
        new InputField({
          title: 'Email',
          name: ComponentsName.EMAIL,
          id: 'email',
          type: 'text',
          onChange: (value: boolean) => {
            this.setProps({ isEmailError: value });
          },
        }),
      input_phone:
        new InputField({
          title: 'Phone',
          name: ComponentsName.PHONE,
          id: 'phone',
          type: 'text',
          onChange: (value: boolean) => {
            this.setProps({ isPhoneError: value });
          },
        }),
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
          title: 'Password',
          name: ComponentsName.PASSWORD,
          id: 'password',
          type: 'password',
          onChange: (value: boolean) => {
            this.setProps({ isPasswordError: value });
          },
        }),

      button:
        new Button({
          text: 'Sign up',
          page: 'chat',
          className: 'button-primary',
          type: 'submit',
          submit,
        }),

    });
  }

  override render() {
    return RegistrPageRaw;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.isFirstNameError !== newProps.isFirstNameError) {
      this.children.input_first_name.setProps({ isError: newProps.isFirstNameError });
    }
    if (oldProps.isSecondNameError !== newProps.isSecondNameError) {
      this.children.input_second_name.setProps({ isError: newProps.isSecondNameError });
    }
    if (oldProps.isEmailError !== newProps.isEmailError) {
      this.children.input_email.setProps({ isError: newProps.isEmailError });
    }
    if (oldProps.isPhoneError !== newProps.isPhoneError) {
      this.children.input_phone.setProps({ isError: newProps.isPhoneError });
    }
    if (oldProps.isLoginError !== newProps.isLoginError) {
      this.children.input_login.setProps({ isError: newProps.isLoginError });
    }
    if (oldProps.isPasswordError !== newProps.isPasswordError) {
      this.children.input_password.setProps({ isError: newProps.isPasswordError });
    }
    return true;
  }
}
