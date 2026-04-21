export const formatPhone = (phone: string) => {
  if (!phone) return ''

  return phone.slice(0, 2)
    + ' (' + phone.slice(2, 5)
    + ') ' + phone.slice(5, 8)
    + ' ' + phone.slice(8, 10)
    + ' ' + phone.slice(10, 12)
}

export const sliceThousand = (value: number) => {
  const formatter = new Intl.NumberFormat('ru-RU', {})
  return formatter.format(value)
}

export const getCoordinatesFromString = (str: string): [number, number] | undefined => {
  if (!str) return undefined

  const [lat, lng] = str.split(',').map(item => Number(item))

  return [lng, lat]
}

/**
 * Склоняет слово в зависимости от числа.
 *
 * @param number Число, от которого зависит форма слова
 * @param form1 Форма слова для "1" (например, "яблоко")
 * @param form2 Форма слова для "2-4" (например, "яблока")
 * @param form5 Форма слова для "5-20" (например, "яблок")
 * @returns Подходящую форму слова
 */
export const declineByNumber = (number: number, form1: string, form2: string, form5: string): string => {
  const absNumber = Math.abs(number)
  const n = absNumber % 100

  if (n >= 11 && n <= 19) {
    return form5
  }

  const lastDigit = n % 10

  if (lastDigit === 1) {
    return form1
  }
  else if (lastDigit >= 2 && lastDigit <= 4) {
    return form2
  }
  else {
    return form5
  }
}
