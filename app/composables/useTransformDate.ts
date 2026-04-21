export const useTransformDate = () => {
  const transformDate = (date?: string) => {
    const d = date ? new Date(date) : null
    if (!d || Number.isNaN(d.getTime())) return ''
    const parts = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })
      .formatToParts(d)

    return parts
      .filter(p => p.type === 'month' || p.type === 'year')
      .map(p => p.value)
      .join(' ')
  }

  const transformFullDate = (date?: string) => {
    const d = date ? new Date(date) : null
    if (!d || Number.isNaN(d.getTime())) return ''

    const parts = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
      .formatToParts(d)

    return parts
      .filter(p => p.type === 'day' || p.type === 'month' || p.type === 'year')
      .map(p => p.value)
      .join(' ')
  }

  const transformDateYaer = (date?: string) => {
    const d = date ? new Date(date) : null
    if (!d || Number.isNaN(d.getTime())) return ''
    const parts = new Intl.DateTimeFormat('ru-RU', { year: 'numeric' })
      .formatToParts(d)
    return parts
      .filter(p => p.type === 'year')
      .map(p => p.value)
      .join(' ')
  }

  return { transformDate, transformFullDate, transformDateYaer }
}
