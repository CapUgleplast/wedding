import { z } from 'zod'

const payloadSchema = z.object({
  name: z.string().min(1),
  contactMethod: z.enum(['telegram', 'whatsapp']),
  whatsappPhone: z.string().optional(),
  telegramNick: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = payloadSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid lead payload',
    })
  }

  const { contactMethod, whatsappPhone, telegramNick } = parsed.data
  if (contactMethod === 'telegram' && !telegramNick) {
    throw createError({ statusCode: 400, statusMessage: 'telegramNick is required' })
  }
  if (contactMethod === 'whatsapp' && !whatsappPhone) {
    throw createError({ statusCode: 400, statusMessage: 'whatsappPhone is required' })
  }

  return { ok: true }
})

