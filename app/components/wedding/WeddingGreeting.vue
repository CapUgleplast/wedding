<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="max-w-3xl mx-auto"
    >
      <Heading
        variant="2"
        class="text-center"
        leading="none"
      >
        Дорогие гости!
      </Heading>

      <Text
        leading="none"
        class="mt-6 text-center text-[#322D29] lg:max-w-2xl mx-auto"
      >
        Мы очень хотим сделать этот день особенным, поэтому приглашаем Вас разделить с нами торжество, посвящённое дню нашей свадьбы!
      </Text>

      <div class="relative mt-20 mx-auto max-w-md border border-[#322D29] border-r-0">
        <Image
          src="/svg/circle.svg"
          alt="Wedding"
          class="h-full aspect-square absolute left-1/2 -translate-x-1/2 scale-125"
        />
        <div class="grid grid-cols-3 text-center text-sm text-[#322D29]">
          <div class="border-r border-[#322D29] py-3">
            ЧЕТВЕРГ
          </div>
          <div class="border-r border-[#322D29] py-3">
            ПЯТНИЦА
          </div>
          <div class="py-3">
            СУББОТА
          </div>
        </div>
        <div class="border-t border-[#322D29]" />
        <div class="grid grid-cols-3 text-center">
          <div class="border-r border-[#322D29] py-5">
            <Text class="!text-6xl">
              16
            </Text>
            <Text variant="sm">
              июля
            </Text>
          </div>
          <div class="border-r border-[#322D29] py-5">
            <Text class="!text-6xl">
              17
            </Text>
            <Text
              variant="sm"
            >
              июля
            </Text>
          </div>
          <div class="py-5">
            <Text class="!text-6xl">
              18
            </Text>
            <Text variant="sm">
              июля
            </Text>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
