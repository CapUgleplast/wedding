<script setup lang="ts">
import Image from '../ui/image/Image.vue'
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] pb-20 sm:pb-28">
    <Container
      variant="wild"
      class="text-center relative"
    >
      <Image
        src="https://optim.tildacdn.com/tild3331-3833-4633-a335-323033353432/-/format/webp/113.png.webp"
        alt="Александр и Дарья"
        class="w-full bg-amber-400 sm:max-w-[50%] min-h-svh md:min-h-[60svh] mx-auto"
      />
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pb-10">
        <Heading
          variant="3"
          class=""
          leading="none"
        >
          Александр &amp; Дарья
        </Heading>
        <Heading
          variant="4"
          leading="none"
          class="mt-4"
        >
          17/07
        </Heading>
      </div>
    </Container>
  </section>
</template>
