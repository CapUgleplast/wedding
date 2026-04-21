<script setup lang="ts">
interface Props {
  items: {
    label: string
    value: string
    count: number
    icon?: string
  }[]
}

defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <ToggleGroupComponent
    v-model="model"
    :items="items"
    items-variant="default"
    variant="custom"
    class="w-full rounded-none"
  >
    <template #default="{ item }">
      <div class="flex items-center w-full justify-between ">
        <div class="flex items-center gap-3">
          <IconElement
            v-if="item?.icon"
            :name="item.icon"
            size="16"
            class="size-4!"
          />
          <Heading
            variant="7"
            leading="none"
            class="whitespace-nowrap"
          >
            {{ item.label }}
          </Heading>
        </div>

        <Text
          leading="tight"
          variant="xxs"
          class="rounded-full text-[10px] flex items-center justify-center bg-current/10 text-current min-w-5 size-5 pt-[1px] pr-[1px]"
        >
          {{ item.count }}
        </Text>
      </div>
    </template>
  </ToggleGroupComponent>
</template>

<style scoped>

</style>
