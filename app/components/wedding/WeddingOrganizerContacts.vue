<script setup lang="ts">
const organizerName = 'Юлия'
const phone = '+70000000000'
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="max-w-4xl text-center mx-auto flex flex-col gap-4 items-center"
    >
      <Heading
        variant="3"
        class="font-serif font-normal"
      >
        Контакты
      </Heading>

      <Text class=" text-[#322D29]">
        Если вы хотите сделать для нас сюрприз или уточнить детали торжества, свяжитесь, пожалуйста,<br>
        с нашим организатором — {{ organizerName }}.
      </Text>

      <Button
        :to="`tel:${phone}`"
        class="w-fit"
      >
        Позвонить
      </Button>
    </Container>
  </section>
</template>
