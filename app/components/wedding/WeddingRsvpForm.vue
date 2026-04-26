<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  fullName: z.string().min(1),
  attendance: z.enum(['да', 'нет']),
  alcohol: z.array(z.enum(['Шампанское', 'Вино белое', 'Вино красное', 'Коньяк/Виски', 'Водка', 'Безалкогольные напитки'])).min(1),
  hot: z.enum(['Курица', 'Мясо', 'Рыба']),
  allergies: z.string().min(1),
})

type FormState = z.infer<typeof schema>

const state = ref<FormState>({
  fullName: '',
  attendance: 'да',
  alcohol: [],
  hot: 'Курица',
  allergies: '',
})

const defaultState = JSON.parse(JSON.stringify(state.value))

const alcohol = [
  {
    label: 'Шампанское',
    value: 'Шампанское',
  },
  {
    label: 'Вино белое',
    value: 'Вино белое',
  },
  {
    label: 'Вино красное',
    value: 'Вино красное',
  },
  {
    label: 'Коньяк/Виски',
    value: 'Коньяк/Виски',
  },
  {
    label: 'Водка',
    value: 'Водка',
  },
  {
    label: 'Безалкогольные напитки',
    value: 'Безалкогольные напитки',
  },
]

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitOk = ref(false)

const onSubmit = async () => {
  submitOk.value = false
  submitError.value = null

  const parsed = schema.safeParse(state.value)
  console.log(parsed)

  if (!parsed.success) {
    submitError.value = 'Пожалуйста, заполните все поля анкеты.'
    return
  }

  isSubmitting.value = true
  try {
    await useFetch('/api/wedding/rsvp', {
      method: 'POST',
      body: parsed.data,
    })
    state.value = defaultState
    submitOk.value = true
  }
  catch {
    submitError.value = 'Не удалось отправить анкету. Попробуйте позже.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-8">
    <Container
      variant="wild"
      class="mx-auto"
    >
      <Heading
        variant="2"
        class="mt-10 text-center"
      >
        Анкета
      </Heading>

      <Text
        variant="md"
        class="text-center "
      >
        Подтвердите, пожалуйста, своё присутствие до <strong>1.06.2026</strong><br> Так мы заранее позаботимся о вашей рассадке, ужине и сюрпризах,<br> которые никак нельзя пропустить!
      </Text>

      <div
        class="mt-8 space-y-7 font-light"
      >
        <div>
          <Text class="mb-2 text-[#322D29]">
            Ваше имя и фамилия
          </Text>
          <Input
            v-model="state.fullName"
            class="w-full bg-white/60"
          />
        </div>

        <fieldset
          class="space-y-3"
          @submit.stop
        >
          <Text class="text-[#322D29]">
            Получится ли у вас присутствовать?
          </Text>
          <RadioGroup
            v-model="state.attendance"
            class="flex flex-wrap gap-4"
          >
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="да"
              />
              <span>Да</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="нет"
              />
              <span>Нет</span>
            </label>
          </RadioGroup>
        </fieldset>

        <fieldset class="space-y-3">
          <Text class="text-[#322D29]">
            Что предпочитаете из алкоголя?
          </Text>
          <div class="grid gap-3 sm:grid-cols-2">
            <CheckboxGroupComponent
              v-model="state.alcohol"
              :items="alcohol"
            />
          </div>
        </fieldset>

        <fieldset
          class="space-y-3"
          @submit.stop
        >
          <Text class="text-[#322D29]">
            Ваши предпочтения по горячим блюдам?
          </Text>
          <RadioGroup
            v-model="state.hot"
            class="flex flex-wrap gap-4"
          >
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="Курица"
              />
              <span>Курица</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="Мясо"
              />
              <span>Мясо</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="Рыба"
              />
              <span>Рыба</span>
            </label>
          </RadioGroup>
        </fieldset>

        <div>
          <Text class="mb-2 text-[#322D29]">
            Есть ли у вас пищевые аллергии?
          </Text>
          <Input
            v-model="state.allergies"
            class="w-full bg-white/60"
          />
        </div>

        <div class="pt-2">
          <Button
            :disabled="isSubmitting"
            class="w-full rounded-full hover:scale-105 disabled:opacity-60"
            @click="onSubmit"
          >
            {{ isSubmitting ? 'Отправляем…' : 'Отправить' }}
          </Button>

          <Text
            v-if="submitError"
            class="animate-in fade-in-0 text-center text-sm text-red-700 h-0"
          >
            {{ submitError }}
          </Text>
          <Text
            v-if="submitOk"
            class="animate-in fade-in-0 text-center text-sm text-emerald-800 h-0"
          >
            Спасибо! Анкета отправлена.
          </Text>
        </div>
      </div>
    </Container>
  </section>
</template>
