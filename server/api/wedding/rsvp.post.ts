import { z } from 'zod'

const payloadSchema = z.object({
  fullName: z.string().min(1),
  attendance: z.enum(['yes', 'no']),
  alcohol: z.array(z.enum(['champagne', 'white_wine', 'red_wine', 'cognac_whiskey', 'vodka', 'non_alcohol'])).min(1),
  hot: z.enum(['chicken', 'meat', 'fish']),
  allergies: z.string().min(1),
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

  // TODO: wire to real destination (email/CRM/Strapi) when ready.
  // SSR-safe: processing happens server-side, client only hits this endpoint.
  return { ok: true }
})

