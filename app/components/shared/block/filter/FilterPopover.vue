<script setup lang="ts">
interface Props {
  items: {
    label: string
    value: string
  }[]
  placeholder: string
  type: 'multiple' | 'single'
}

const props = defineProps<Props>()

const model = defineModel<string | string[]>()

const showModel = computed(() => {
  if (model.value?.length) {
    return Array.isArray(model.value) ? model.value.join(', ') : model.value
  }
  return props.placeholder
})
</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger
        variant="none"
        class="px-8 py-3 max-w-full"
      >
        <div class="flex items-center gap-2 max-w-[calc(100%-22px)]">
          <Heading
            variant="6"
            leading="none"
            class="line-clamp-1 text-start break-all"
          >
            {{ showModel }}
          </Heading>
          <Icon
            v-if="model?.length"
            name="icons:dot"
            class="text-success !size-1.5 min-w-1.5 min-h-1.5"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        class="bg-secondary p-5 pr-1 w-80"
      >
        <SharedBlockFilterList
          v-model="model"
          :type="type"
          :items="items"
          :title="placeholder"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>

<style scoped>

</style>
