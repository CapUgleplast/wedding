import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { promiseTimeout } from '@vueuse/core'

gsap.registerPlugin(ScrollTrigger)

export const useScrollCardsAnimation = () => {
  const scrollTrigger = ref<ScrollTrigger | undefined>()
  const tweens = ref<gsap.core.Tween[]>([])
  const { isSmallScreen } = useScreenSize()

  const getCards = (cardsElement: HTMLElement | undefined) => {
    const cardsChildren = (cardsElement?.children ?? []) as HTMLElement[]
    return [...cardsChildren]
  }

  const init = async (sectionElement: HTMLElement | undefined, cardsElement: HTMLElement | undefined, foregroundElement: HTMLElement | undefined) => {
    destroy()

    await promiseTimeout(0)
    await promiseTimeout(0)

    if (isSmallScreen.value || !sectionElement) return

    scrollTrigger.value = ScrollTrigger.create({
      trigger: sectionElement,
      start: 'top top+=64',
      end: `bottom+=${window.innerHeight} bottom`,
      scrub: true,
      pin: false,
      pinSpacing: false,
      anticipatePin: 0.5,
    })

    const cards = getCards(cardsElement)

    // Начальные позиции при загрузке
    const initialPositions = [
      0,
      700,
      200,
    ]

    // Позиции при окончании скролла
    const endPositions = [
      -window.innerHeight * -0.2,
      -window.innerHeight * -0.2,
      -window.innerHeight * -0.1,
    ]

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        {
          y: initialPositions[i] ?? 0,
        },
        {
          y: endPositions[i] ?? 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionElement,
            start: 'top top+=64',
            end: `bottom+=${window.innerHeight} bottom`,
            scrub: 1,
          },
        },
      )

      tweens.value.push(tween)
    })

    // Анимация текста
    if (foregroundElement) {
      const textTween = gsap.fromTo(
        foregroundElement,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: -window.innerHeight * 0.5,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionElement,
            start: 'top top+=64',
            end: `bottom+=${window.innerHeight} bottom`,
            scrub: 1,
          },
        },
      )

      tweens.value.push(textTween)
    }
  }

  const destroy = () => {
    scrollTrigger.value?.kill()
    tweens.value.forEach(tween => tween.kill())
    tweens.value = []
  }

  return {
    init,
    destroy,
    isSmallScreen,
  }
}
