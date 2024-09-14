import type { NitroFetchRequest, $Fetch } from 'nitropack'
import type { User } from '~/types/user'

export interface UserRepository {
  pending: Ref<boolean>
  users: Ref<User[]>
  currentPage: Ref<number>
  perPage: Ref<number>
  deleteUsers: () => void
  getUsers: () => void
}

export const userRepository = (fetch: $Fetch<any, NitroFetchRequest>): UserRepository => {
  const toast = useToast()
  const pending: Ref<boolean> = ref(false)
  const users: Ref<User[]> = ref([])
  const currentPage = ref(1)
  const perPage = ref(10)

  function deleteUsers() {
    users.value = []
  }

  async function getUsers() {
    pending.value = true
    try {
      const usersResponse: User[] = await fetch('/users')
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
    currentPage,
    perPage,
    getUsers,
    deleteUsers
  }
}
