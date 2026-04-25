export const useMuteState = () => {
  const isMuted = useState(() => true)

  return {
    isMuted,
  }
}
