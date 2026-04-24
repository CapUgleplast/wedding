<script setup lang="ts">
const getNextWeddingDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const candidate = new Date(year, 7, 12, 17, 0, 0) // Aug (0-based) + time placeholder
  if (candidate.getTime() > now.getTime()) return candidate
  return new Date(year + 1, 7, 12, 17, 0, 0)
}

const target = getNextWeddingDate()
const { state } = useWeddingCountdown(target)

const pad2 = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section class="text-white ">
    <Container
      variant="wild"
      class="text-center mx-auto relative py-16 sm:py-20 h-[60svh]"
    >
      <div class="absolute inset-x-0 z-2 flex flex-col items-center top-40">
        <Heading
          variant="2"
        >
          До встречи через:
        </Heading>

        <div class="w-[90%] md:w-1/2 mt-10 grid grid-cols-4 justify-items-center gap-3 sm:gap-6">
          <div class="">
            <div class="text-3xl sm:text-5xl">
              {{ pad2(state.days) }}
            </div>
            <div class="mt-1 text-xs ">
              дней
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl">
              {{ pad2(state.hours) }}
            </div>
            <div class="mt-1 text-xs ">
              часа
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl">
              {{ pad2(state.minutes) }}
            </div>
            <div class="mt-1 text-xs ">
              минут
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl">
              {{ pad2(state.seconds) }}
            </div>
            <div class="mt-1 text-xs ">
              секунд
            </div>
          </div>
        </div>
      </div>
      <Image
        class="w-full max-md:absolute inset-0 object-cover lg:object-contain"
        src="https://optim.tildacdn.com/tild3463-6234-4239-b838-316666623037/-/cover/352x483/center/center/-/format/webp/Subtract4.png.webp"
      />
    </Container>
  </section>
</template>
