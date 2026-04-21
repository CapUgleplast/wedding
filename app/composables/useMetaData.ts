import type { Picture } from '~/components/ui/image/Picture'

export interface MetaData {
  title?: string
  description?: string
  og_image?: Picture
}

const DEFAULT_TITLE = 'Купите квартиру в Перми в новостройках'
const DEFAULT_DESCRIPTION = '✅Купить квартиру от застройщика Унистрой. Планировки, инфраструктура и цены однокомнатных, двухкомнатных и трехкомнатных квартир в новостройке.'
const DEFAULT_IMAGE = '/mock/og.png'

export const useMetaData = (seoObj?: MetaData) => {
  const title = seoObj?.title || DEFAULT_TITLE
  const description = seoObj?.description || DEFAULT_DESCRIPTION
  const image = useRuntimeConfig().public.imageUrl + (seoObj?.og_image?.url || DEFAULT_IMAGE)

  useSeoMeta({
    title,
    ogTitle: title,
    twitterTitle: title,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogImage: image,
    twitterImage: image,
    ogImageAlt: title,
    twitterCard: 'summary_large_image',
    ogType: 'website',
    ogUrl: 'https://unistroy.ru',
  })
}
