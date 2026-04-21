import type { FosData } from '../../../app/types/fos'

export default defineEventHandler(async (event): Promise<FosData | undefined> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'slug is required',
    })
  }

  const params = {
    query: {
      filters: {
        path: { $eqi: slug },
      },
      populate: {
        fos_default: {
          populate: {
            colors: {
              populate: '*',
            },
          },
        },
      },
    },
  }

  const { data: fos } = await strapi.GET('/landings', { params })

  if (!fos) {
    throw createError({
      statusCode: 404,
      statusMessage: 'fos not found',
    })
  }

  return fos.data?.[0]?.fos_default as FosData
})
