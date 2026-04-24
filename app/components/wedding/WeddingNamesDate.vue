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
        class="w-full object-cover min-h-svh md:min-h-[60svh] mx-auto"
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
          variant="3"
          leading="none"
          class="mt-4"
        >
          17/07
        </Heading>
      </div>
    </Container>
  </section>
</template>
