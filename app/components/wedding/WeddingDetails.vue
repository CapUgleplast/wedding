<script setup lang="ts">
const details = [
  {
    icon: '1',
    label: '1234',
    data: 'title',
  },
  {
    icon: '2',
    label: '1234',
    data: 'title',
  },
  {
    icon: '3',
    label: '1234',
    data: 'title',
  },
]
</script>

<template>
  <section class="text-white">
    <Container
      variant="wild"
      class="mx-auto relative py-16 sm:py-20"
    >
      <div class="relative z-2 py-10 px-4 sm:px-8">
        <Heading
          variant="1"
          class="relative text-center"
        >
          Details
        </Heading>

        <div class=" mt-10 flex flex-col gap-6">
          <div
            v-for="(item, idx) in details"
            :key="idx"
            class="flex gap-2 nth-[2]:flex-row-reverse items-center text-5xl"
          >
            <Popover>
              <PopoverTrigger
                variant="primary"
                :hide-icon="true"
                class="text-4xl !size-16 xl:!size-20 transition-all hover:scale-105"
                as="button"
              >
                {{ item.icon }}
              </PopoverTrigger>
              <PopoverContent :side="idx % 2 ? 'left' : 'right'">
                <Text variant="lg">
                  {{ item.data }}
                </Text>
              </PopoverContent>
            </Popover>
            <Heading variant="2">
              -
            </Heading>
            <Heading variant="2">
              {{ item.label }}
            </Heading>
          </div>
        </div>
      </div>

      <Image
        class="size-full absolute inset-0 brightness-90 object-cover lg:object-contain"
        src="https://static.tildacdn.com/tild3464-3365-4663-a433-613666623062/Subtract1.png"
      />
    </Container>
  </section>
</template>
