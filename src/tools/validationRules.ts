// правила валидации
// eslint-disable-next-line no-shadow
export enum ComponentsName {
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    LOGIN = 'login',
    EMAIL = 'email',
    PASSWORD = 'password',
    PHONE = 'phone',
    MESSAGE = 'message',
}

export const validationRules = {
  [ComponentsName.FIRST_NAME]: /^[A-ZА-Я][a-zа-я-]*$/,
  [ComponentsName.SECOND_NAME]: /^[A-ZА-Я][a-zа-я-]*$/,
  [ComponentsName.LOGIN]: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
  [ComponentsName.EMAIL]: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  [ComponentsName.PASSWORD]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [ComponentsName.PHONE]: /^\+?\d{10,15}$/,
  [ComponentsName.MESSAGE]: /\S+/,
};
