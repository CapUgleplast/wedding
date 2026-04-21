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
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="text-center mx-auto relative md:max-w-xl"
    >
      <div class="absolute inset-x-0 z-2 flex flex-col items-center top-10">
        <Heading
          variant="3"
        >
          До встречи через:
        </Heading>

        <div class="w-1/2 mt-10 grid grid-cols-4 gap-3 sm:gap-6">
          <div class="">
            <div class="text-3xl sm:text-5xl font-serif">
              {{ pad2(state.days) }}
            </div>
            <div class="mt-1 text-xs text-[#322D29]">
              дней
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl font-serif">
              {{ pad2(state.hours) }}
            </div>
            <div class="mt-1 text-xs text-[#322D29]">
              часа
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl font-serif">
              {{ pad2(state.minutes) }}
            </div>
            <div class="mt-1 text-xs text-[#322D29]">
              минут
            </div>
          </div>
          <div class="">
            <div class="text-3xl sm:text-5xl font-serif">
              {{ pad2(state.seconds) }}
            </div>
            <div class="mt-1 text-xs text-[#322D29]">
              секунд
            </div>
          </div>
        </div>
      </div>
      <Image
        class="w-full h-[60svh]"
        src="https://static.tildacdn.com/tild3464-3365-4663-a433-613666623062/Subtract1.png"
      />
    </Container>
  </section>
</template>
