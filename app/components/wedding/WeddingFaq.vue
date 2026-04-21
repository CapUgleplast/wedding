<script setup lang="ts">
const included = [
  'Замена фото',
  'Корректировка текста в любом блоке',
  'Изменение цвета фона, блоков',
  'Корректировка программы дня',
  'Изменение палитры дресс-кода и добавление референсов',
  'Изменение или добавление вопросов в анкете',
  'Возможность удалить любой блок из макета',
] as const

const extra = [
  'PDF-версия приглашения — 1500 ₽',
  'Замена шрифта (из другого шаблона) — 1 000 ₽',
  'Создание именной ссылки гостю — 100 ₽ (1 шт.)',
  'Перевод на другой язык — 1 500 ₽',
  'Размещение на индивидуальном домене — 8 500 ₽',
] as const
</script>

<template>
  <section class="bg-white text-[#3D2314] py-16 sm:py-20">
    <Container variant="wild" class="max-w-5xl">
      <Heading variant="2" class="text-center font-serif font-normal">
        вопрос/ответ
      </Heading>

      <div class="mt-10 grid gap-8 lg:grid-cols-2">
        <div class="rounded-lg border border-[#322D29]/20 bg-[#F5ECDE]/40 p-6">
          <Heading variant="3" class="font-serif font-normal">
            Изменения, которые включены в стоимость макета
          </Heading>
          <ul class="mt-6 space-y-3 text-[#322D29]">
            <li v-for="item in included" :key="item" class="flex gap-3">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#777B56]" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="rounded-lg border border-[#322D29]/20 bg-[#F5ECDE]/40 p-6">
          <Heading variant="3" class="font-serif font-normal">
            Что можно добавить за отдельную плату
          </Heading>
          <ul class="mt-6 space-y-3 text-[#322D29]">
            <li v-for="item in extra" :key="item" class="flex gap-3">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF8562]" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </section>
</template>

