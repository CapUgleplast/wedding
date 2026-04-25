<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const schedule = [
  { time: '17:00', title: 'Welcome' },
  { time: '17:30', title: 'Начало банкета' },
  { time: '21:30', title: 'Торт' },
  { time: '22:30', title: 'Финал' },
] as const

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const heartRef = ref<HTMLElement | null>(null)

type HeartKeyframe = { x: number, y: number }

// Derived from click2invite.ru block div#rec1862692141 (tilda "scroll" sbs opts),
// then scaled to our section scroll distance.
const heartKeyframesDesktop: HeartKeyframe[] = [
  { x: 0, y: 0 },
  { x: 5, y: 85 },
  { x: 73, y: 171 },
  { x: 105, y: 233 },
  { x: 81, y: 302 },
  { x: 12, y: 355 },
  { x: -61, y: 397 },
  { x: -116, y: 462 },
  { x: -120, y: 521 },
  { x: -68, y: 570 },
  { x: -10, y: 595 },
  { x: 70, y: 644 },
  { x: 120, y: 711 },
  { x: 115, y: 781 },
  { x: 41, y: 834 },
  { x: -33, y: 861 },
  { x: -105, y: 891 },
  { x: -148, y: 946 },
  { x: -141, y: 1004 },
  { x: -74, y: 1055 },
  { x: 21, y: 1100 },
  { x: 116, y: 1160 },
  { x: 136, y: 1241 },
  { x: 115, y: 1303 },
  { x: 5, y: 1403 },
]

const heartKeyframesMobile: HeartKeyframe[] = [
  ...heartKeyframesDesktop.slice(0, -1),
  { x: -3, y: 1403 },
]

const getHeartPoint = (frames: HeartKeyframe[], progress01: number) => {
  const clamped = Math.min(1, Math.max(0, progress01))
  const lastIndex = frames.length - 1
  const t = clamped * lastIndex
  const i = Math.min(lastIndex - 1, Math.floor(t))
  const localT = t - i

  const a = frames[i]!
  const b = frames[i + 1]!

  return {
    x: gsap.utils.interpolate(a.x, b.x, localT),
    y: gsap.utils.interpolate(a.y, b.y, localT),
  }
}

onMounted(() => {
  if (!import.meta.client) return
  if (!sectionRef.value || !heartRef.value) return
  const isMobile = useMediaQuery('(max-width: 485px)')
  console.log(isMobile.value)

  const ctx = gsap.context(() => {
    const maxY = 1403
    const maxAbsX = 148

    const st = ScrollTrigger.create({
      trigger: sectionRef.value!,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const frames = window.innerWidth < 1200 ? heartKeyframesMobile : heartKeyframesDesktop
        const { x, y } = getHeartPoint(frames, self.progress)

        // Scale the motion to our section so it "feels" like the original.
        const sectionHeight = sectionRef.value!.offsetHeight
        const travelY = Math.max(0, sectionHeight - 40) // 96 ~= heart size + breathing room
        const yScaled = (y / maxY) * travelY
        const xScaled = (x / maxAbsX) * (isMobile.value ? 170 : 190) // keep lateral movement subtle in our layout

        gsap.set(heartRef.value!, { x: xScaled, y: yScaled })
      },
    })

    onBeforeUnmount(() => st.kill())
  }, sectionRef)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section
    id="wedding-content"
    class="bg-[#F5ECDE] text-[#3D2314]"
  >
    <Container
      variant="wild"
      class="relative mx-auto max-md:!p-0"
    >
      <div class="mt-10 flex flex-col gap-8">
        <div class="rounded-lg relative max-md:px-4">
          <ul class="absolute inset-x-0 top-80 bottom-54 flex flex-col z-2">
            <li
              v-for="(item) in schedule"
              :key="item.time"
              class="flex flex-1 flex-col justify-center items-center gap-4 relative"
            >
              <div class="bg-secondary absolute rounded-full size-40 blur-xl" />
              <Heading
                class="min-w-16 z-2"
                variant="3"
              >
                {{ item.title }}
              </Heading>
              <Text
                class="text-[#322D29] z-2"
                variant="lg"
              >
                {{ item.time }}
              </Text>
            </li>
          </ul>

          <div
            ref="sectionRef"
            class="relative xs:h-[1800px]"
          >
            <div
              ref="heartRef"
              class="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 will-change-transform transform-gpu"
            >
              <img
                src="https://static.tildacdn.com/tild6430-3230-4663-b063-626435613063/1990638-777b56.svg"
                alt=""
                class="h-16 w-16 sm:h-20 sm:w-20"
                aria-hidden="true"
              >
            </div>
            <Image
              src="https://static.tildacdn.com/tild3631-6338-4061-b436-333636386235/svg_1758649796645.svg"
              class="size-full pt-4 pr-1.5 sm:pt-8 xs:pr-3"
            />
          </div>
        </div>

        <div>
          <div class="text-center md:p-6">
            <Heading
              variant="2"
            >
              Место проведения
            </Heading>
            <Text class="text-[#322D29]">
              Сбор гостей для праздничного банкета<br> <strong>Банкетный зал «Пассаж»<br> Адрес: г. Красноярск, пр. Мира, 96</strong>
            </Text>
          </div>
        </div>
        <Image
          provider="none"
          class="mx-auto w-full object-cover"
          src="/mock/passage.jpg"
        />
      </div>
    </Container>
  </section>
</template>
