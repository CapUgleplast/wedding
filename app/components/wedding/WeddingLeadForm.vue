<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  contactMethod: z.enum(['telegram', 'whatsapp']),
  whatsappPhone: z.string().optional(),
  telegramNick: z.string().optional(),
})

type LeadState = z.infer<typeof schema>

const state = reactive<LeadState>({
  name: '',
  contactMethod: 'telegram',
  whatsappPhone: '',
  telegramNick: '',
})

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitOk = ref(false)

const onSubmit = async () => {
  submitOk.value = false
  submitError.value = null

  const parsed = schema.safeParse(state)
  if (!parsed.success) {
    submitError.value = 'Пожалуйста, заполните имя.'
    return
  }

  if (state.contactMethod === 'telegram' && !state.telegramNick) {
    submitError.value = 'Укажите ник в Telegram.'
    return
  }

  if (state.contactMethod === 'whatsapp' && !state.whatsappPhone) {
    submitError.value = 'Укажите номер телефона в WhatsApp.'
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/wedding/lead', {
      method: 'POST',
      body: parsed.data,
    })
    submitOk.value = true
  }
  catch {
    submitError.value = 'Не удалось отправить заявку. Попробуйте позже.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="bg-white text-[#3D2314] py-16 sm:py-20">
    <Container variant="wild" class="max-w-3xl">
      <form class="space-y-7" @submit.prevent="onSubmit">
        <div>
          <Text class="mb-2 text-[#322D29]">
            Ваше имя
          </Text>
          <Input v-model="state.name" class="w-full bg-[#F5ECDE]/40" />
        </div>

        <fieldset class="space-y-3">
          <Text class="text-[#322D29]">
            Где вам удобно общаться?
          </Text>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center gap-2">
              <input v-model="state.contactMethod" type="radio" value="telegram">
              <span>Telegram</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="state.contactMethod" type="radio" value="whatsapp">
              <span>WhatsApp</span>
            </label>
          </div>
        </fieldset>

        <div v-if="state.contactMethod === 'whatsapp'">
          <Text class="mb-2 text-[#322D29]">
            Ваш номер телефона в WhatsApp
          </Text>
          <Input v-model="state.whatsappPhone" class="w-full bg-[#F5ECDE]/40" />
        </div>

        <div v-else>
          <Text class="mb-2 text-[#322D29]">
            Ваш ник в Telegram
          </Text>
          <Input v-model="state.telegramNick" class="w-full bg-[#F5ECDE]/40" />
        </div>

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-full bg-[#777B56] text-[#FF8562] ring-1 ring-[#5A5D45] hover:bg-[#6f734f] disabled:opacity-60"
        >
          {{ isSubmitting ? 'Отправляем…' : 'Отправить' }}
        </Button>

        <Text v-if="submitError" class="text-center text-sm text-red-700">
          {{ submitError }}
        </Text>
        <Text v-if="submitOk" class="text-center text-sm text-emerald-800">
          Спасибо! Заявка отправлена.
        </Text>
      </form>
    </Container>
  </section>
</template>

