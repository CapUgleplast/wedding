import type { ConcreteComponent } from 'vue'

export type Schema<T extends keyof {}> = any

export type DynamicComponents = Record<string, ConcreteComponent | Component | string | undefined>

export type Relations<T> = {
  data?: RelationData<T>[]
}

export type Relation<T> = {
  data?: RelationData<T>
}

export type RelationData<T> = {
  id?: number
  solutionsCount?: number
  attributes?: T
}
