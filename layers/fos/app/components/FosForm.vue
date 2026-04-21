<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { validationMessages } from '../utils/validationMessages'
import { CyrillicOnly } from '../utils/validations'
import type { FormType, FormDataCompact } from '../types/form'
import type { ColorsFos } from '~/types/colors'

const props = withDefaults(defineProps<{
  variant?: 'light' | 'dark'
  formType?: FormType
  colors?: ColorsFos
  description?: string
  title?: string
  logo?: boolean
  disabledWhenSending?: boolean
}>(), {
  variant: 'light',
  formType: 'callback',
  disabledWhenSending: true,
})

const emit = defineEmits<{
  formData: [data: FormDataCompact]
}>()

const buttonVariant = computed(() => {
  return props.variant === 'light' ? 'secondary-filled' : 'accent-outline'
})

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ message: validationMessages.required })
      .min(2, validationMessages.minLength(2))
      .max(30, validationMessages.maxLength(30))
      .refine(value => CyrillicOnly.safeParse(value).success, {
        message: validationMessages.cyrillicOnly,
      }),
    phone: z
      .string({ message: validationMessages.required })
      .refine(value => PhoneRegex.safeParse(value).success, {
        message: validationMessages.phoneFormat,
      }),
    terms: z.boolean().refine(value => value === true, {
      message: validationMessages.termsRequired,
    }),
  }),
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    terms: false,
  },
})
const success = ref(false)
const onSubmit = handleSubmit((values, actions) => {
  emit('formData', {
    ...values,
    confirmationType: props.formType,
  })

  actions.resetForm()

  if (!props?.disabledWhenSending) {
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 2000)
  }
  else {
    success.value = true
  }
})
</script>

<template>
  <Logo
    v-if="logo"
    class="lg:hidden !h-8 absolute top-5 left-4"
  />

  <Heading
    v-if="title"
    variant="3"
    weight="bolder"
    leading="custom"
    class="mb-6 lg:mb-8 whitespace-pre-line"
  >
    {{ title }}
  </Heading>
  <Text
    v-if="description"
    variant="base"
    weight="normal"
    leading="tight"
    class="mb-10 lg:mb-16 max-w-[340px] whitespace-pre-line"
  >
    {{ description }}
  </Text>
  <form
    class="space-y-5 root-fos-colors"
    @submit="onSubmit"
  >
    <div class="space-y-2">
      <FormField
        v-slot="{ componentField }"
        name="name"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="input-colors"
              v-bind="componentField"
              placeholder="Ваше имя"
              :disabled="success"
            />
          </FormControl>
          <FormMessage
            :variant="variant"
          />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="phone"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              v-phone-mask
              type="tel"
              class="input-colors"
              placeholder="+7 (___)___-__-__"
              v-bind="componentField"
              :disabled="success"
            />
          </FormControl>
          <FormMessage
            :variant="variant"
          />
        </FormItem>
      </FormField>
    </div>

    <div class="pt-4 sm:pt-5">
      <FormField
        v-slot="{ componentField }"
        name="terms"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <FosCheckbox
              id="terms"
              v-bind="componentField"
              :class="success ? 'pointer-events-none! opacity-60' : ''"
            >
              <template #label>
                Даю <NuxtLink
                  class="underline"
                  to="?modal=policy"
                  :replace="true"
                >согласие на обработку персональных данных</NuxtLink>
              </template>
            </FosCheckbox>
          </FormControl>
          <FormMessage
            class="whitespace-nowrap"
            :variant="variant"
          />
        </FormItem>
      </FormField>
    </div>

    <Button
      type="submit"
      :colors="colors?.button"
      class="w-full"
      :disabled="success"
      :variant="buttonVariant"
    >
      {{ success ? 'Заявка успешно отправлена' : 'Заказать консультацию' }}
      <template #after>
        <Icon :name="success ? 'icons:check' : 'icons:arrow-right'" />
      </template>
    </Button>
  </form>
</template>

<style scoped>
.input-colors {
  color: v-bind(colors?.form?.text);
  background-color: v-bind(colors?.form?.background);
  border-color: v-bind(colors?.form?.background);

  &:is(:where(.group):hover *) {
     @media (hover: hover) {
       background-color: v-bind(colors?.form?.text)
     }
   }

   &::placeholder {
     color: color-mix(in oklab, v-bind(colors?.form?.text) 60%, transparent);
   }
}

.root-fos-colors {
  color: v-bind(colors?.base?.text);
}
</style>
