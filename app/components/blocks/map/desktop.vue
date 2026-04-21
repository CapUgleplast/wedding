<script setup lang="ts">
import type { ColorsMap } from '~/types/colors'

interface Props {
  project: Project
  pins?: Schema<'ProjectPinComponent'>[]
  colors?: ColorsMap['map']
}

const props = defineProps<Props>()

const { isSmallScreen } = useScreenSize()

const isMounted = useMounted()

const getCategories = computed(() => {
  const categories = props.pins?.reduce((acc, pin) => {
    const existingCategory = acc.find(category => category.value === pin.category?.id)
    if (!existingCategory) {
      return [...acc,
        {
          label: pin.category?.name,
          value: pin.category?.id,
          icon: pin.category?.icon,
          count: props.pins?.filter(item => item.category?.id === pin.category?.id)?.length,
        },
      ]
    }
    return acc
  }, []) || []

  return [
    {
      label: 'Все',
      value: '',
      count: props.pins?.length,
    },
    ...categories,
  ]
})

const selectedCategory = ref<string | undefined>(getCategories.value[0].value)

const getPins = computed(() => {
  if (selectedCategory.value) {
    return props.pins?.filter(item => item.category?.id === selectedCategory.value)
  }

  return props.pins
})

const getFilterLabel = computed(() => {
  if (!selectedCategory.value) return 'Места рядом'

  const category = getCategories.value.find(item => item.value === selectedCategory.value)
  return category?.label || 'Места рядом'
})

watch(selectedCategory, (val) => {
  if (val === undefined) {
    selectedCategory.value = getCategories.value[0].value
  }
})
</script>

<template>
  <div class="size-full relative">
    <BlocksMapWrapper
      :projects="[project]"
      :pins="getPins"
      marker-view="desktop"
      :zoom="16"
      :colors="colors"
    />
    <div class="absolute max-sm:bottom-5 sm:top-5 left-5 max-sm:right-5">
      <Collapsible
        v-if="getCategories.length > 1"
        :reversed="isSmallScreen"
        :default-open="true"
        class="sm:max-w-[380px] shadow-base map-collapsible-colors"
      >
        <CollapsibleTrigger
          :show-icon="true"
          class="justify-between sm:w-[380px] map-collapsible-colors px-5 py-3.75"
        >
          <div class="flex w-full items-center gap-2">
            <Heading
              variant="7"
              leading="none"
              class="line-clamp-1 text-start break-all"
            >
              {{ getFilterLabel }}
            </Heading>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent
          class="map-collapsible-colors p-0! shadow-none! sm:w-[380px] z-1"
        >
          <SharedBlockMapToggleFilter
            v-if="isMounted && getCategories.length > 1"
            v-model="selectedCategory"
            :items="getCategories"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>

<style scoped>
.map-collapsible-colors {
  background: v-bind('colors?.background');
  color: v-bind('colors?.text');
}
</style>
