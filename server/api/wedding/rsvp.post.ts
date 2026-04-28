import { z } from 'zod'

const payloadSchema = z.object({
  fullName: z.string().min(1),
  attendance: z.enum(['да', 'нет']),
  alcohol: z.array(z.enum(['Шампанское', 'Вино белое', 'Вино красное', 'Коньяк/Виски', 'Водка', 'Безалкогольные напитки'])).min(1),
  phone: z.string().min(70000000000).max(89999999999).length(11),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = payloadSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid RSVP payload',
    })
  }

  const res = await $fetch('https://script.google.com/macros/s/AKfycbwK1czdGr_G0m-mUgGqyuVbp-Oe6GHOHsPxjIIdsv5JPFqckT00BFNaFIZseOk7qT6x/exec', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res
})
