import { ComponentsName, validationRules } from './validationRules';

export function validate(name: ComponentsName, value: string): boolean {
  const rule = validationRules[name];

  return rule && rule.test(value);
}
