import { useQuery } from '@tanstack/vue-query'
import type { FosData } from '../types/fos'

export const useFos = async (slug: string) => {
  const { data, suspense, ...rest } = useQuery({
    queryKey: queryKeys.fos.default(slug),
    queryFn: () => $fetch<FosData>(`/api/fos/${slug}`),
  })

  onServerPrefetch(() => suspense())

  await suspense()

  return { data, suspense, ...rest }
}
