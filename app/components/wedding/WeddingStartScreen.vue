<script setup lang="ts">
const isOpen = ref(false)
const isOut = ref(false)
const isOff = ref(false)

const { isMuted } = useMuteState()

watch(isOpen, (newVal) => {
  if (newVal) {
    window.scrollTo(0, 0)
    isMuted.value = false
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
      bg-[#787C57] text-white
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
          class="w-[200vw] sm:w-[1100px] max-w-none"
          src="/mock/111.png.webp"
          alt=""
          loading="lazy"
        >
        <Heading
          variant="1"
          leading="none"
          class="absolute top-[16svh] sm:top-[12svh] left-1/2 -translate-x-1/2 text-center tracking-wide"
        >
          Приглашение<br>
          на свадьбу
        </Heading>
      </div>
      <img
        class="absolute -bottom-20 left-1/2 w-[200vw] sm:w-[1100px] max-w-none -translate-x-1/2 transition-all duration-1500"
        :class="{
          '-bottom-full': isOpen,
        }"
        src="/mock/112.png.webp"
        alt=""
        loading="lazy"
      >
    </div>

    <Container
      variant="wild"
      class="relative mx-auto z-10 flex min-h-svh flex-col items-center justify-center py-16"
    >
      <button
        class="mt-10 size-40 cursor-pointer hover:brightness-90 transition-all"
        type="button"
        @click="isOpen = true"
      >
        <Image
          class="size-full object-cover"
          src="/mock/hf_20260130_121201_e.png.webp"
        />
      </button>
    </Container>
  </section>
</template>
