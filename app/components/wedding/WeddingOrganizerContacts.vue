<script setup lang="ts">
const organizerName = 'Мария'
const phone = '+79029185709'
</script>

<template>
  <section class="bg-[#F5ECDE] text-[#3D2314] py-16 sm:py-20">
    <Container
      variant="wild"
      class="text-center mx-auto flex flex-col gap-4 items-center"
    >
      <Heading
        variant="2"
      >
        Контакты
      </Heading>

      <Text class="text-[#322D29]">
        Если вы хотите сделать для нас сюрприз или уточнить детали торжества, свяжитесь, пожалуйста,<br>
        с нашим организатором — {{ organizerName }}.
      </Text>

      <Button
        :to="`tel:${phone}`"
        class="w-fit rounded-md hover:scale-110"
      >
        Позвонить
        <Icon name="icons:phone" />
      </Button>
    </Container>
  </section>
</template>
