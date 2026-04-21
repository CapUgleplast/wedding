<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'

const { name, formMessageId } = useFormField()
</script>

<template>
  <SharedElementResizer class="!w-full">
    <ErrorMessage
      :id="formMessageId"
      as="p"
      :name="toValue(name)"
      class="text-xs px-5 font-normal text-current w-full"
    >
      <template #default="{ message }">
        <div class="flex items-center gap-2">
          <Icon name="icons:error" />
          {{ message }}
        </div>
      </template>
    </ErrorMessage>
  </SharedElementResizer>
</template>
