import { useHeaderStore } from './../../layers/header/app/stores/header'
import { useQuery } from '@tanstack/vue-query'
import type { Page } from '~~/shared/types/api'

export const useDynamicLanding = async (slug: string) => {
  const { data, suspense, ...rest } = useQuery({
    queryKey: queryKeys.landing.default(slug),
    queryFn: () => $fetch<Page>(`/api/landing/${slug}`),
  })

  onServerPrefetch(() => suspense())
  await suspense()

  const page = data.value as Page
  const { addMenuLink } = useHeaderStore()

  const extraDataMap = {
    'blocks.construction-progress': { items: page?.project?.progress },
    'blocks.planing-solutions': page?.project?.planing_solutions,
    'blocks.contacts': { coordinates: page?.project?.coordinates, cover: page?.project?.cover, name: page?.project?.name },
    'blocks.map': { pins: page?.project?.pins, project: { coordinates: page?.project?.coordinates, cover: page?.project?.cover, name: page?.project?.name } },
    'blocks.slider-with-modal': { modal_colors: page?.modal_colors },
  }

  const blocks = page?.blocks?.map((block) => {
    if (block.anchor) addMenuLink(block.anchor)
    const extraItems = extraDataMap[block?.__component]
    return extraItems
      ? { ...block, ...extraItems }
      : block
  })
  return {
    page,
    seo: page?.seo,
    blocks,
    data,
    suspense,
    ...rest,
  }
}
