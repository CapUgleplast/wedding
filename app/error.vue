<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const errorMessage = computed(() => {
  if (!props.error) {
    return 'Что-то пошло не так'
  }
  if (props.error.statusCode === 404) {
    return 'Извините, страница не найдена'
  }
  return 'Что-то пошло не так'
})
</script>

<template>
  <div class="relative flex h-screen w-screen flex-col items-center justify-center bg-primary">
    <div class="relative z-10 max-w-lg text-center">
      <Motion
        :initial="{ opacity: 0, scale: 0.97, y: 10, filter: 'blur(10px)' }"
        :animate="{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.5, bounce: 1, type: 'spring', stiffness: 70, damping: 10 }"
        class="mb-4 bg-gradient-to-t from-white/20 to-white bg-clip-text text-[12rem] font-light leading-none text-transparent lg:text-[14rem]"
      >
        {{ error?.statusCode || 'Ошибка' }}
      </Motion>
      <Motion
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.5, bounce: 1, type: 'spring', stiffness: 70, damping: 10, delay: 0.2 }"
        class="mb-32  uppercase text-white"
      >
        <Text
          variant="h5"
          class="font-light opacity-60"
        >
          {{ errorMessage }}
        </Text>
      </Motion>
      <Motion
        :initial="{ opacity: 0, y: -10, scale: 0.9, filter: 'blur(10px)' }"
        :animate="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"
        :transition="{ duration: 0.5, bounce: 1, type: 'spring', stiffness: 70, damping: 10, delay: 0.4 }"
      >
        <Button
          @click="clearError({ redirect: '/' })"
        >
          Вернуться на главную
        </Button>
      </Motion>
    </div>
  </div>
</template>
