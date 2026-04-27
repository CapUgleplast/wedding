<script setup lang="ts">
const palette = [
  { hex: '#fffaf5' },
  { hex: '#d6dbaf' },
  { hex: '#d2d2b9' },
  { hex: '#dcdcc8' },
  { hex: '#bec391' },
  { hex: '#aaaa9b' },
  { hex: '#d7cdaf' },
  { hex: '#b9b482' },
  { hex: '#a09687' },
  { hex: '#b9b496' },
  { hex: '#918c5f' },
  { hex: '#f3e3a9' },
] as const
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="mx-auto xl:max-w-6xl!"
    >
      <Heading
        variant="2"
        class="text-center"
        leading="none"
      >
        Дресс-код
      </Heading>
      <Text class="mt-6 text-center text-[#322D29]">
        Мы очень ждем и с удовольствием готовимся к этому незабываемому дню!<br> Поддержите нас вашими улыбками и объятиями,<br> а также красивыми нарядами в палитре торжества
      </Text>

      <div class="mt-10 lg:flex gap-4 items-center grid grid-cols-2 justify-items-center">
        <div
          class="sm:flex flex-3 flex-wrap items-center justify-center justify-items-center gap-2
                    grid grid-cols-6 max-sm:col-span-2 w-fit mx-auto"
        >
          <div
            v-for="c in palette"
            :key="c.hex"
            class="size-12 rounded-full border border-black/10"
            :style="{ backgroundColor: c.hex }"
          />
        </div>
        <div class="flex-2">
          <Image
            class=" sm:h-[30svh] h-[25svh] object-contain"
            src="/mock/dress1.webp"
          />
        </div>
        <div class="flex-3">
          <Image
            class=" sm:h-[35svh] h-[25svh] object-contain"
            src="/mock/dress2.webp"
          />
        </div>
        <div class="flex-4 max-sm:col-span-2">
          <Image
            class=" sm:h-[40svh] h-[25svh] object-contain"
            src="/mock/dress3.webp"
          />
        </div>
      </div>
    </Container>
  </section>
</template>
