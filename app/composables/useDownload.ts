// export function useDownload() {
//   /**
//    * Скачать файл из URL или Blob
//    * @param source - URL (string) или Blob
//    * @param filename - имя файла при сохранении
//    */
//   const download = async (source: string, filename?: string) => {
//     const response = await fetch(source)
//     const blob = await response.blob()
//     const url = window.URL.createObjectURL(blob)
//     const link = document.createElement('a')
//     link.href = url
//     link.setAttribute('download', filename || 'file')
//     document.body.appendChild(link)
//     link.click()
//   }
//   return {
//     download,
//   }
// }
export function useDownload() {
  /**
   * Скачать файл из URL
   * Работает и для внешних ссылок без CORS
   * @param url - ссылка на файл
   * @param filename - имя файла для сохранения
   */
  const download = (url: string, filename?: string) => {
    const link = document.createElement('a')
    link.href = url.startsWith('/') ? useRuntimeConfig().public.strapiUrl.replace(/\/api\/?$/, '') + url : url
    link.download = filename || url.split('/').pop() || 'file'
    link.target = '_blank' // для безопасности, чтобы не заменял текущую вкладку
    link.click()
  }

  return {
    download,
  }
}
