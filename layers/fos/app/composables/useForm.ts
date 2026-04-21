import type { FormViewData } from '../types/form'

export default function useForm() {
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const route = useRoute()
  const send = async (data: FormViewData, route: string): Promise<void> => {
    const payload = { ...data }
    delete payload.terms
    delete payload.confirmationType
    isLoading.value = true
    const { status } = await useFetch(route, {
      method: 'POST',
      body: payload,
    })
    if (status.value === 'success') {
      isLoading.value = false
      isSuccess.value = true
      setTimeout(() => {
        isSuccess.value = false
      }, 2000)
    }
    if (status.value === 'error') {
      isLoading.value = false
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 1000)
    }
  }

  const dataFormatter = (data: FormViewData): FormViewData => {
    const val = {
      ...data,
      type: data.confirmationType ?? '--',
      message: [
        `Предпочитаемый способ связи: ${data.confirmationType === 'callback' ? 'Звонок' : 'Мессенджер'}`,
      ].join('\n'),
      flat_id: data?.flat_id || 0,
      referrerPage: route.path as string,
    }

    return val
  }

  return { send, isLoading, dataFormatter, isSuccess, isError }
}
