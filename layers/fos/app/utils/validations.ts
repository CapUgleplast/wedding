import * as z from 'zod'

export const CyrillicOnly = z
  .string()
  .regex(/^[а-яА-ЯёЁ\- ]+$/, 'Имя должно содержать только русские буквы')

export const PhoneRegex = z
  .string()
  .regex(/^\+7 (9\d{2}|342) \d{3} \d{2} \d{2}$/, 'Поддерживаются мобильные номера и городские номера Перми')

export const EmailRegex = z
  .string()
  .regex(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, 'Неверный формат E-mail')
