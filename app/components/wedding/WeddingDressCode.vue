<script setup lang="ts">
const palette = [
  { name: 'Оливковый', hex: '#787C57' },
  { name: 'Песочный', hex: '#F5ECDE' },
  { name: 'Тёплый коричневый', hex: '#3D2314' },
  { name: 'Коралловый акцент', hex: '#FF8562' },
] as const
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="mx-auto xl:!max-w-4xl"
    >
      <Heading
        variant="2"
        class="text-center"
      >
        Дресс-код
      </Heading>
      <Text class="mt-6 text-center text-[#322D29]">
        Мы будем очень благодарны, если вы поддержите цветовую палитру нашей свадьбы.
      </Text>

      <div class="mt-10 lg:flex gap-4 items-center grid sm:grid-cols-2">
        <div class="flex flex-3 flex-wrap items-center justify-center gap-2">
          <div
            v-for="c in palette"
            :key="c.hex"
            class="size-10 rounded-full border"
            :style="{ backgroundColor: c.hex }"
          />
        </div>
        <div class="flex-2">
          <Image class="bg-black sm:h-[30svh] h-[25svh]" />
        </div>
        <div class="flex-3">
          <Image class="bg-black sm:h-[35svh] h-[25svh]" />
        </div>
        <div class="flex-4">
          <Image class="bg-black sm:h-[40svh] h-[25svh]" />
        </div>
      </div>
    </Container>
  </section>
</template>
