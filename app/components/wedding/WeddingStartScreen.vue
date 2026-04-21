<script setup lang="ts">
const isOpen = ref(false)
const isOut = ref(false)
const isOff = ref(false)

watch(isOpen, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      isOut.value = true
    }, 500)
    setTimeout(() => {
      isOff.value = true
    }, 2000)
  }
})
</script>

<template>
  <section
    v-if="!isOff"
    class="
      min-h-svh overflow-hidden transition-all duration-1000 z-40
      bg-[#787C57] text-[#FF8562]
    "
    :class="{
      'opacity-0': isOut,
    }"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-1500"
        :class="{
          '-top-full': isOpen,
        }"
      >
        <img
          class=" w-[1100px] max-w-none"
          src="https://optim.tildacdn.com/tild6139-6630-4533-a566-393534303461/-/format/webp/111.png.webp"
          alt=""
          loading="lazy"
        >
        <Heading
          variant="1"
          class="absolute top-[12svh] left-1/2 -translate-x-1/2 text-center font-serif font-normal tracking-wide"
        >
          Приглашение<br>
          на свадьбу
        </Heading>
      </div>
      <img
        class="absolute -bottom-20 left-1/2 w-[1100px] max-w-none -translate-x-1/2 transition-all duration-1500"
        :class="{
          '-bottom-full': isOpen,
        }"
        src="https://optim.tildacdn.com/tild3831-3736-4162-a635-396230643036/-/format/webp/112.png.webp"
        alt=""
        loading="lazy"
      >
    </div>

    <Container
      variant="wild"
      class="relative z-10 flex min-h-svh flex-col items-center justify-center py-16"
    >
      <Button
        variant="secondary"
        class="mt-10 rounded-full bg-[#777B56] text-[#FF8562] ring-1 ring-[#5A5D45] hover:bg-[#6f734f]"
        type="button"
        @click="isOpen = true"
      >
        Далее
      </Button>
    </Container>
  </section>
</template>
