import type { Geo } from '~/types/geo'

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}
