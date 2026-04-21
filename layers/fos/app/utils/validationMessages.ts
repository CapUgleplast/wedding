export const validationMessages = {
  required: 'Обязательное поле',
  minLength: (min: number) => `Длина поля должна быть не менее ${min} символов`,
  maxLength: (max: number) => `Длина поля должна быть не более ${max} символов`,
  cyrillicOnly: 'Имя должно содержать только русские буквы',
  phoneFormat: 'Неверный формат телефона ',
  termsRequired: 'Необходимо согласие',
  emailFormat: 'Неверный формат E-mail',
}
