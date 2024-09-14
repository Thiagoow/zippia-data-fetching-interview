import type { Address } from '~/types/address'
import type { Company } from '~/types/company'

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
