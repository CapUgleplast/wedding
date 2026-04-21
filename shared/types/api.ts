

export type Schema<T extends keyof components['schemas']> = components['schemas'][T]

// export type SharedSeoComponent = Schema<'SharedSeoComponent'>
// export type SharedSocialComponent = Schema<'SharedSocialComponent'>

export type Page = Schema<'Landing'>
export type PageResponse = Schema<'LandingResponse'>
export type Project = Schema<'Project'>

export type Image = Schema<'BlocksInfoComponent'>['image']
export type Button = Schema<'ContentButtonConditionalComponent'>

// export type Menu = Schema<'Menu'>

// export interface Group extends Schema<'SharedLinkGroupComponent'> {
//   links?: Schema<'Menu'>[]
// }

// export interface Header extends Schema<'Header'> {
//   promo?: Schema<'Promotion'>
//   promos?: Schema<'Promotion'>[]
//   office?: Schema<'Office'>
//   groups?: Group[]
// }

// export interface Footer extends Schema<'Footer'> {
//   groups?: LinkGroup[]
//   office?: Office
// }
