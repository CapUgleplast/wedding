<script setup lang="ts">
const details = [
  {
    icon: 'gift',
    label: 'Цветы',
    data: 'Приятным комплиментом для нас будет, если вместо цветов вы решите подарить нам сертификаты в Hoff / DNS / Море Эмоций',
  },
  {
    icon: 'kindergarten',
    label: 'Маленькие гости',
    data: 'К нашему большому сожалению, на территории, где будет проходить торжество, нет детских зон. Просим позаботиться заранее о том, с кем вы оставите своих детей на время свадьбы',
  },
]
</script>

<template>
  <Container
    variant="wild"
    class="mx-auto relative py-16 sm:py-20 text-white max-sm:px-0"
  >
    <div class="absolute inset-0 top-20 z-2 py-10 px-4 sm:px-16 xl:px-20">
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
              class="text-4xl min-w-16 xl:min-w-20 !size-16 xl:!size-20 p-2 transition-all hover:scale-105"
              as="button"
            >
              <IconElement
                :name="item.icon"
                class="!size-10 xl:!size-14"
              />
            </PopoverTrigger>
            <PopoverContent
              :side="idx % 2 ? 'left' : 'right'"
              class="max-w-[60vw] w-lg"
            >
              <Text variant="md">
                {{ item.data }}
              </Text>
            </PopoverContent>
          </Popover>
          <Heading variant="2">
            -
          </Heading>
          <Heading
            variant="2"
            leading="none"
            class="xl:!text-5xl max-md:w-min text-end"
          >
            {{ item.label }}
          </Heading>
        </div>
      </div>
    </div>

    <Image
      class="size-full brightness-90 object-cover lg:object-contain"
      src="https://static.tildacdn.com/tild3464-3365-4663-a433-613666623062/Subtract1.png"
    />
  </Container>
</template>
