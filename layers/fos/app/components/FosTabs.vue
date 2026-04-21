<script setup lang="ts">
import type { ColorsFos } from '~/types/colors'
import type { FormType } from '../types/form'

interface Props {
  variant?: 'light' | 'dark'
  fosType?: 'callback' | 'reserved'
  colors?: ColorsFos
  description?: string
  title?: string
  logo?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'light',
  fosType: 'callback',
})

const formType = ref('callback')

const tabs = [
  {
    label: 'Звонок',
    value: 'callback',
    component: resolveComponent('FosForm'),
  },
  {
    label: 'Мессенджер',
    value: 'messenger',
    component: resolveComponent('FosForm'),
  },
]

const { send, dataFormatter } = useForm()

const onFormData = (data) => {
  const transformedData = dataFormatter(data)

  // umTrackEvent(props.fosType === 'reserved' ? 'send-form-reserved' : 'send-form-callback', {
  //   isModal: true,
  //   page: route.path,
  // })

  send(transformedData, '/api/ticket')
}
</script>

<template>
  <Tabs
    class="w-full"
    :tab-list="tabs.map(tab => tab.value)"
    @update:model-value="formType = $event as FormType"
  >
    <TabsList class="gap-2">
      <!-- <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :variant="buttonVariant"
        :value="tab.value"
      >
        {{ tab.label }}
      </TabsTrigger> -->
    </TabsList>

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      class="size-full max-md:max-w-[446px] mx-auto"
    >
      <component
        :is="tab.component"
        :variant="variant"
        :form-type="formType"
        :colors="colors"
        :description="description"
        :title="title"
        :logo="logo"
        @form-data="onFormData"
      />
    </TabsContent>
  </Tabs>
</template>
