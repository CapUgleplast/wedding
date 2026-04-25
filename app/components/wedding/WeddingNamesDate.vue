<script setup lang="ts">
import Image from '../ui/image/Image.vue'
</script>

<template>
  <section class="text-white">
    <Container
      variant="wild"
      class="text-center relative mx-auto max-md:!p-0"
    >
      <Image
        provider="none"
        src="/mock/main.jpg"
        alt="Александр и Дарья"
        class="w-full object-cover min-h-svh md:min-h-[60svh] mx-auto relative
               after:absolute after:inset-x-0 after:bottom-0 after:opacity-70 after:h-1/2 after:bg-linear-to-t after:from-black after:to-transparent"
      />
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pb-10 w-full">
        <Heading
          variant="2"
          class=""
          leading="none"
        >
          Александр &amp; Дарья
        </Heading>
        <Heading
          variant="2"
          leading="none"
          class="mt-4"
        >
          17/07
        </Heading>
      </div>
    </Container>
  </section>
</template>
