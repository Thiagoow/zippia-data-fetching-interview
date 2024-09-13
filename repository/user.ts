import type { NitroFetchRequest, $Fetch } from 'nitropack'
import type { User, GetUsersParams } from '~/types/user'

export interface UserRepository {
  pending: Ref<boolean>
  users: Ref<User[]>
  getUsers: (parameters: GetUsersParams) => void
}

export const userRepository = (fetch: $Fetch<any, NitroFetchRequest>): UserRepository => {
  const toast = useToast()
  const pending: Ref<boolean> = ref(false)
  const users: Ref<User[]> = ref([])

  async function getUsers(parameters: GetUsersParams) {
    pending.value = true
    try {
      const usersResponse: User[] = await fetch('/users', {
        query: parameters.query
      })
      users.value = usersResponse
    } catch (error: any) {
      toast.add({
        title: 'Erro',
        description: error.response._data.errors[0].message || error.message,
        color: 'red'
      })
    }
    pending.value = false
  }

  return {
    pending,
    users,
    getUsers
  }
}
