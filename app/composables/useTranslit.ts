import CyrillicToTranslit from 'cyrillic-to-translit-js'

export const useTranslit = () => {
  const cyrillicToTranslit = new CyrillicToTranslit()

  const getTranslit = (text: string) => {
    //   const cyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    //   const latin = 'abvgdeejzijklmnoprstufhzcss_y_eiu'
    //   const map = new Map([...cyrillic].map((char, index) => [char, latin[index]]))
    //   return text.split('').map(char => map.get(char) || char).join('')

    return cyrillicToTranslit.transform(text, '_').toLowerCase()
  }

  return { getTranslit }
}
