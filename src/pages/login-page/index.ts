import { Button, InputField } from "../../components";
import Block from "../../tools/Block";
import "./login-page.css";

import LoginPageRaw from "./login-page.hbs";
import { ComponentsName } from "../../tools/validationRules";
import router from "../../tools/router";
import UserController from "../../controllers/user-controller";
import AuthController from "../../controllers/auth-controller";
import { SignInRequest } from "../../api/types";
import isBlock from "../../tools/BlockGuard";

interface Props {
  [key: string]: unknown;
}

export class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      input_login: new InputField({
        title: "Login",
        name: ComponentsName.LOGIN,
        id: "login",
        type: "text",
        onChange: (value: boolean) => {
          this.setProps({ isLoginError: value });
        },
      }),
      input_password: new InputField({
        className: "login-page__input",
        title: "Password",
        name: ComponentsName.PASSWORD,
        type: "password",
        id: "password",
        onChange: (value: boolean) => {
          this.setProps({ isPasswordError: value });
        },
      }),

      button_primary: new Button({
        text: "Login",
        page: "login",
        className: "button-primary",
        type: "submit",
        onClick: e => {
          const target = e!.target as HTMLInputElement;
          const formData = new FormData(target.form!);

          const userObj = {} as SignInRequest;

          Array.from(formData.entries()).forEach(
            ([key, value]: [string, string]) => {
              userObj[key] = value;
            }
          );

          AuthController.signinUser(userObj)
            .then(() => UserController.getUserInfo())
            .then(() => {
              router.go("/messenger");
            })
            .catch(error => {
              console.error("Ошибка при авторизации пользователя:", error);
            });
        },

        id: "login-button",
      }),
      button_secondary: new Button({
        text: "Not registered yet?",
        page: "login",
        className: "button-secondary",
        id: "register-button",
        onClick: () => {
          router.go("/sign-up");
        },
      }),
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (
      oldProps.isLoginError !== newProps.isLoginError &&
      isBlock(this.children.input_login)
    ) {
      this.children.input_login.setProps({ isError: newProps.isLoginError });
    }
    if (
      oldProps.isPasswordError !== newProps.isPasswordError &&
      isBlock(this.children.input_password)
    ) {
      this.children.input_password.setProps({
        isError: newProps.isPasswordError,
      });
    }
    return true;
  }

  override render() {
    return this.compile(LoginPageRaw, this.props);
  }
}
