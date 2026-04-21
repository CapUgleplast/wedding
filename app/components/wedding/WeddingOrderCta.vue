<script setup lang="ts">
const telegramUrl = '#'
</script>

<template>
  <section class="bg-white text-[#3D2314] py-16 sm:py-20">
    <Container variant="wild" class="max-w-4xl text-center">
      <Heading variant="2" class="font-serif font-normal">
        Для заказа данного приглашения оставьте заявку или напишите нам
      </Heading>

      <div class="mt-10 flex flex-col items-center gap-4">
        <a
          :href="telegramUrl"
          class="inline-flex items-center justify-center rounded-full bg-[#777B56] px-6 py-3 text-[#FF8562] ring-1 ring-[#5A5D45] hover:bg-[#6f734f] transition-colors"
          target="_blank"
          rel="noopener"
        >
          Telegram
        </a>

        <Text class="text-sm text-[#322D29]">
          Max
        </Text>

        <a
          href="/"
          class="text-sm text-[#322D29] underline underline-offset-4 hover:text-[#3D2314]"
        >
          Главная
        </a>
      </div>
    </Container>
  </section>
</template>

