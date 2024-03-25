import { Button, InputField } from '../../components';
import Block, { Props } from '../../tools/Block';
import { submit } from '../../tools/formUtils';
import { ComponentsName } from '../../tools/validationRules';
import './settings-page.css';

import SettingsPageRaw from './settings-page.hbs?raw';

export class SettingsPage extends Block {
  htmlTemplate: string;

  constructor() {
    super({
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
      input_display_name:
        new InputField({
          title: 'Display name',
          name: 'display_name',
          type: 'text',
          id: 'display_name',
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

      button:
        new Button({
          text: 'Change password',
          page: 'chat',
          className: 'button-on-page',
          id: 'changePasswordBtn',
        }),

      input_oldPassword:
        new InputField({
          title: 'Old password',
          name: 'oldPassword',
          id: 'oldPassword',
          type: 'password',
          onChange: (value: boolean) => {
            this.setProps({ isOldPasswordError: value });
          },
        }),
      input_newPassword:
        new InputField({
          title: 'New password',
          name: 'newPassword',
          id: 'newPassword',
          type: 'password',
          onChange: (value: boolean) => {
            this.setProps({ isNewPasswordError: value });
          },
        }),

      button_second:
        new Button({
          text: 'Save',
          page: 'chat',
          className: 'button-primary',
          type: 'submit',
          submit,
        }),
    });

    this.htmlTemplate = SettingsPageRaw;
  }

  override render() {
    return SettingsPageRaw;
  }

  override componentDidUpdate(oldProps: Props, newProps: Props) {
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
      this.children.input_oldPassword.setProps({ isError: newProps.isPasswordError });
    }
    if (oldProps.isNewPasswordError !== newProps.isNewPasswordError) {
      this.children.input_newPassword.setProps({ isError: newProps.isNewPasswordError });
    }

    return true;
  }
}
