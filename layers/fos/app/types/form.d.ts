export interface UTMParams {
  [key: string]: string | null
}
export interface additionalParams {
  [key: string]: string | null
}
export type Type = 'modal' | 'fos'

export interface FormDataCompact {
  name: string
  phone: string
  terms?: boolean
  ads?: boolean
  confirmationType?: FormType
}

export type FormType = 'modal' | 'fos' | 'callback' | 'reserved'

export interface FormData extends FormDataCompact {
  email?: string
  flat_id?: number | string | string[]
  utm: UTMParams
  message?: string
  type?: Type
  referrerPage?: string
  user_ip?: string
  ga_id?: string
  ym_uid?: string
  additional?: additionalParams
}

export interface FormViewData extends FormData {
  date?: string
  time?: string
  username?: string
  type?: string
}

export interface Form {
  data: FormViewData
}
