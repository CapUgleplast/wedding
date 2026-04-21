<script setup lang="ts">
import type { ConcreteComponent, HTMLAttributes } from 'vue'
import type { Page } from '#shared/types/api'

const { blocks, ...props } = defineProps<{
  blocks?: Page['blocks']
  class?: HTMLAttributes['class']
}>()

defineOptions({ inheritAttrs: false })

const components: Record<string, ConcreteComponent | string> = {
  'blocks.hero': resolveComponent('LazyBlocksHero'),
  'blocks.hero-alt': resolveComponent('LazyBlocksHeroAlt'),
  'blocks.info': resolveComponent('LazyBlocksInfo'),
  'blocks.slider-with-modal': resolveComponent('LazyBlocksSlidersWithModal'),
  'blocks.location': resolveComponent('LazyBlocksLocation'),
  'blocks.architecture': resolveComponent('LazyBlocksArchitecture'),
  'blocks.landscaping': resolveComponent('LazyBlocksLandscaping'),
  'blocks.developer': resolveComponent('LazyBlocksDeveloper'),
  'blocks.gallery-with-tabs': resolveComponent('LazySharedBlockGalleryWithTabs'),
  'blocks.construction-progress': resolveComponent('LazyBlocksConstructionProgress'),
  'blocks.non-residential': resolveComponent('LazyBlocksNonResidential'),
  'blocks.planing-solutions': resolveComponent('LazyBlocksPlaningSolutions'),
  'blocks.purchase-methods': resolveComponent('LazyBlocksPurchaseMethods'),
  'blocks.feature': resolveComponent('LazyBlocksFeatures'),
  'blocks.form': resolveComponent('LazyFosBlock'),
  'blocks.contacts': resolveComponent('LazyContactsBlock'),
  'blocks.map': resolveComponent('LazyBlocksMap'),
  'blocks.scroll-section': resolveComponent('LazyBlocksScroll'),
}
</script>

<template>
  <div :class="cn('pb-5 sm:pb-10 md:pb-14', props.class)">
    <component
      :is="components[component.__component ?? ''] ?? 'div'"
      v-for="component of (blocks ?? [])"
      :key="component.__component"
      :data="component"
    />
  </div>
</template>
