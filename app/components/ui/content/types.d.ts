import type { Picture, PictureAttributes, PictureData } from '~/layers/ui/components/image/Picture'
import type { VideoData } from '~/components/ui/video'

export type Modal = {
  id: number
  title: string
  description: string
  source_tracker: string
  button_name: string
}

export interface keyValue {
  key: string
  value: string
}

export type AbstractString = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface TextNode extends AbstractString {
  type: 'text'
  code?: boolean
}

export interface LinkNode extends AbstractString {
  type: 'link'
  url: string
  children: TextNode[]
}

export type ListItemNode = {
  type: 'list-item'
  children: (TextNode | LinkNode)[]
}

export type ListNode = {
  type: 'list'
  format: 'unordered' | 'ordered'
  children: ListItemNode[]
}

export type HeadingNode = {
  type: 'heading'
  level: 1 | 2 | 3
  children: TextNode[]
}

export type ImageNode = {
  type: 'image'
  image: PictureAttributes
  children: TextNode[]
}

export type QuoteNode = {
  type: 'quote'
  children: TextNode[]
}

export type ParagraphNode = {
  type: 'paragraph'
  children: (TextNode | LinkNode)[]
}

export type ContentNode
  = | ParagraphNode
    | ListNode
    | HeadingNode
    | ImageNode
    | QuoteNode

export type RichContentBlock = {
  __component: 'content.rich-content'
  id: number
  content: ContentNode[]
}

export type VideoBlock = {
  __component: 'content.video'
  id: number
  video: VideoData
}

export type PictureBlock = {
  __component: 'content.picture'
  id: number
  picture: Picture
}

export type GalleryBlock = {
  __component: 'content.gallery'
  id: number
  gallery: {
    data: PictureData[]
  }
}

export type ButtonBlock = {
  __component: 'content.button'
  id: number
  name: string
  link?: string
  type: 'link' | 'form' | 'modal'
  modal: Modal
}

export type FootnoteBlock = {
  __component: 'content.footnote'
  id: number
  text: string
}

export type BannerBlock = {
  __component: 'content.banner'
  id: number
  title: string
  button_text: string
  image: Picture
}

export type ContentBlock
  = | RichContentBlock
    | VideoBlock
    | PictureBlock
    | GalleryBlock
    | ButtonBlock
    | FootnoteBlock
    | BannerBlock

export type MediaArticle = {
  id: number
  title: string
  publication_date: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  blocks: ContentBlock[]
  cover: Picture
  related: object[]
}

export type InfoBlock = {
  __component: 'content.info'
  id: number
  title: string
  items: keyValue[]
}

export type ListBlock = {
  __component: 'content.list'
  id: number
  title: string
  items: { value: string }[]
  button: {
    name: string
    link?: string
    type: 'link' | 'form' | 'modal'
  }
}
