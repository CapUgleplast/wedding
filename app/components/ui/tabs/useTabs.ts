import { createInjectionState } from '@vueuse/core'

const [useProvideTabs, useInjectTabs] = createInjectionState(
  (tabList: string[], model: Ref<string | number | undefined>) => {
    const tabListExternal = [...tabList]
    const list = ref(tabList)

    const currentTab = model

    const currentTabIndex = ref(0)

    const canSwitchPrev = ref(false)
    const canSwitchNext = ref(true)

    const initEmptyTab = (value: string) => {
      if (!tabListExternal?.length) {
        list.value.push(value)
      }
    }

    const switchPrev = () => {
      const index = currentTabIndex.value
      if (index > 0) {
        currentTab.value = list.value[index - 1]
      }
    }

    const switchNext = () => {
      const index = currentTabIndex.value
      if (index < list.value.length - 1) {
        currentTab.value = list.value[index + 1]
      }
    }

    const checkCanSwitch = () => {
      const index = currentTabIndex.value
      canSwitchPrev.value = index > 0
      canSwitchNext.value = index < list.value.length - 1
    }

    watch(currentTab, (val) => {
      currentTabIndex.value = list.value.indexOf(val?.toString() || '')
      checkCanSwitch()
    })

    return { list, currentTab, currentTabIndex, canSwitchPrev, canSwitchNext, switchPrev, switchNext, initEmptyTab }
  },
)

function useTabs() {
  const tabslState = useInjectTabs()

  if (!tabslState)
    throw new Error('useTabs must be used within a <Tabs />')

  return tabslState
}

export { useTabs, useProvideTabs }
