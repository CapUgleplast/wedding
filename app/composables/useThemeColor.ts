export const useThemeColor = () => {
  type Themes = 'light' | 'dark'

  const theme = useState('theme', (): Themes => 'dark')

  const onColorChange = (val: Themes) => {
    theme.value = val
  }

  return {
    theme,
    onColorChange,
  }
}
