interface FetchError extends Error {
  data?: unknown
  status?: number
}

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().public.strapiUrl
  const data = await readBody(event)

  const payload = {
    data: { ...data },
  }

  try {
    // данные формы с ID файла
    if (data) {
      await $fetch(url + '/ticket/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      return {
        success: true,
        message: 'Заявка отправлена',
      }
    }

    throw new Error('No form data provided')
  }
  catch (error) {
    const fetchError = error as FetchError
    console.error('Ticket submission error:', fetchError)
    event.node.res.statusCode = 500

    return {
      success: false,
      message: 'Ошибка при отправке заявки',
      error: fetchError.message || 'Unknown error',
    }
  }
})
