export default defineEventHandler(async () => {
  try {
    const data = await $strapi('/fos-documents', {
      query: {
        populate: 'file',
      },
    })
    return data.data
  }
  catch (error) {
    console.error('Ошибка получения данных main:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения данных главной страницы',
    })
  }
})
