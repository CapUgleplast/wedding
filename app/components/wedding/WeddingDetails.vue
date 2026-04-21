<script setup lang="ts">
const details = [
  {
    icon: '1',
    label: '1234',
    data: {
      title: 'title',
      description: 'title',
    },
  },
  {
    icon: '2',
    label: '1234',
    data: {
      title: 'title',
      description: 'title',
    },
  },
  {
    icon: '3',
    label: '1234',
    data: {
      title: 'title',
      description: 'title',
    },
  },
]
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="mx-auto max-w-3xl relative"
    >
      <div class="relative z-2 py-10 px-4">
        <Heading
          variant="2"
          class="relative text-center"
        >
          Details
        </Heading>

        <div class=" mt-10 flex flex-col gap-6">
          <div
            v-for="(item, idx) in details"
            :key="idx"
            class="flex gap-2 nth-[2]:flex-row-reverse"
          >
            <Popover>
              <PopoverTrigger :hide-icon="true">
                <Button>
                  {{ item.icon }}
                </Button>
              </PopoverTrigger>
              <PopoverContent :side="idx % 2 ? 'left' : 'right'">
                {{ item.data }}
              </PopoverContent>
            </Popover>
            <Heading>
              -
            </Heading>
            <Heading>
              {{ item.label }}
            </Heading>
          </div>
        </div>
      </div>

      <Image
        class="size-full absolute inset-0"
        src="https://static.tildacdn.com/tild3464-3365-4663-a433-613666623062/Subtract1.png"
      />
    </Container>
  </section>
</template>
