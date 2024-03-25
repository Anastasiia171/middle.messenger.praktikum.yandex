import { ComponentsName } from './validationRules';

import { validate } from './validate';

// Функция для сбора данных формы и валидации
export function submit(e: SubmitEvent) {
  e.preventDefault();

  const { form } = e.target as HTMLFormElement;

  if (!form) {
    return;
  }

  const formData: { [key: string]: string } = {};
  let isValid = true;

  Array.from(form.elements).forEach((element) => {
    if (
      element instanceof HTMLInputElement
      || element instanceof HTMLSelectElement
      || element instanceof HTMLTextAreaElement
    ) {
      const { name, value } = element;
      if (name) {
        formData[name] = value;
        if (!validate(name as ComponentsName, value)) {
          console.error(`Ошибка: значение поля ${name} невалидно.`);
          isValid = false;
        }
      }
    }
  });

  if (isValid) {
    console.log('Форма валидна, данные формы:', formData); // Выводим данные, если форма валидна
  } else {
    console.log('Форма содержит невалидные данные, отправка отменена.');
  }
}
