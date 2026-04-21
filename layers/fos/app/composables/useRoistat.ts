export default function useRoistat() {
  const extractRoistatData = () => {
    const cookies = document.cookie?.split('; ')

    const data: Record<string, string> = {}

    cookies?.forEach((cookie) => {
      if (cookie && cookie.startsWith('roistat_')) {
        const [key, value] = cookie.split('=')
        data[key] = value
      }
    })

    return data
  }

  const roistat = ref<Record<string, string>>(extractRoistatData())

  return {
    roistat,
    extractRoistatData,
  }
}
