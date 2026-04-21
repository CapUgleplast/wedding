export interface Picture {
  data: PictureData
}

export interface PictureData {
  attributes: PictureAttributes
  id: number
}

export interface PictureAttributes {
  name: string
  alternativeText?: string
  caption?: string
  width: number | string
  height: number | string
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: object
  createdAt: string
  updatedAt: string
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}

export interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}

export interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}

export interface Formats {
  thumbnail: Thumbnail
  medium: Medium
  small: Small
  large: Large
}
