<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  fullName: z.string().min(1),
  attendance: z.enum(['yes', 'no']),
  alcohol: z.array(z.enum(['champagne', 'white_wine', 'red_wine', 'cognac_whiskey', 'vodka', 'non_alcohol'])).min(1),
  hot: z.enum(['chicken', 'meat', 'fish']),
  allergies: z.string().min(1),
})

type FormState = z.infer<typeof schema>

const state = reactive<FormState>({
  fullName: '',
  attendance: 'yes',
  alcohol: [],
  hot: 'chicken',
  allergies: '',
})

const alcohol = [
  {
    label: 'Шампанское',
    value: 'champagne',
  },
  {
    label: 'Вино белое',
    value: 'white_wine',
  },
  {
    label: 'Вино красное',
    value: 'red_wine',
  },
  {
    label: 'Коньяк/Виски',
    value: 'cognac/whiskey',
  },
  {
    label: 'Водка',
    value: 'vodka',
  },
  {
    label: 'Безалкогольные напитки',
    value: 'non_alcohol',
  },
]

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitOk = ref(false)

const toggleAlcohol = (value: FormState['alcohol'][number]) => {
  const idx = state.alcohol.indexOf(value)
  if (idx >= 0) state.alcohol.splice(idx, 1)
  else state.alcohol.push(value)
}

const onSubmit = async () => {
  submitOk.value = false
  submitError.value = null

  const parsed = schema.safeParse(state)
  if (!parsed.success) {
    submitError.value = 'Пожалуйста, заполните все поля анкеты.'
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/wedding/rsvp', {
      method: 'POST',
      body: parsed.data,
    })
    submitOk.value = true
  }
  catch {
    submitError.value = 'Не удалось отправить анкету. Попробуйте позже.'
  }
  finally {
    isSubmitting.value = false
  }
}

watch(state, (val) => {
  console.log(val)
}, { deep: true })
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

      <form
        class="mt-8 space-y-7 font-light"
        @submit.prevent="onSubmit"
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

        <fieldset class="space-y-3">
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
                value="yes"
              />
              <span>Да</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="no"
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

        <fieldset class="space-y-3">
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
                value="chicken"
              />
              <span>Курица</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="meat"
              />
              <span>Мясо</span>
            </label>
            <label class="flex items-center gap-2">
              <RadioGroupItem
                type="radio"
                value="fish"
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
            type="submit"
            :disabled="isSubmitting"
            class="w-full rounded-full hover:scale-105 disabled:opacity-60"
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
      </form>
    </Container>
  </section>
</template>
