<script setup lang="ts">
useHead({ title: 'Zippia - Test Project' })
import { userRepository } from '~/repository/user'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const { $api } = useNuxtApp()
const { pending, getUsers, deleteUsers, users, currentPage, perPage } = userRepository($api)

const query = ref('')
const defaultColumns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true
  },
  {
    key: 'username',
    label: 'Username'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'address',
    label: 'City'
  },
  {
    key: 'company',
    label: 'Company'
  }
]

const rows = computed(() => {
  const lowercasedQuery = query.value.toLowerCase()
  const startIndex = (currentPage.value - 1) * perPage.value
  const endIndex = currentPage.value * perPage.value

  let filteredUsers = users.value
  if (query.value) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(lowercasedQuery)
    )
  }

  return filteredUsers.slice(startIndex, endIndex)
})
</script>

<template>
  <UContainer class="flex flex-col gap-y-5 py-14">
    <DashboardToolbar>
      <template #left>
        <UButton
          variant="soft"
          icon="i-heroicons-globe-alt-20-solid"
          label="Fetch Users"
          :loading="pending"
          @click="getUsers"
        />

        <UButton
          color="red"
          variant="soft"
          icon="i-heroicons-trash-20-solid"
          class="w-max"
          label="Delete Users"
          @click="deleteUsers"
        />
      </template>

      <template #right>
        <UInput
          v-model="query"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Filter users by name..."
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="query !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="query = ''"
            />
          </template>
        </UInput>

        <UButton
          color="gray"
          :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
          label="Toggle Theme"
          @click="colorMode.preference = isDark ? 'light' : 'dark'"
        />
      </template>
    </DashboardToolbar>

    <UTable
      :rows="rows"
      :columns="defaultColumns"
      :loading="pending"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #expand="{ row }">
        <div class="p-4">
          <pre class="text-sm text-gray-500 dark:text-gray-400">{{ row }}</pre>
        </div>
      </template>

      <template #email-data="{ row }">
        <a class="lowercase underline text-primary" :href="`mailto:${row.email.toLowerCase()}`">
          {{ row.email }}
        </a>
      </template>

      <template #address-data="{ row }">
        {{ row.address.city }}
      </template>

      <template #company-data="{ row }">
        {{ row.company.name }}
      </template>
    </UTable>

    <div class="flex justify-end px-3 gap-x-2 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <USelect
        v-model="perPage"
        :options="[
          { value: 5, label: '5 rows per page' },
          { value: 10, label: '10 rows per page' }
        ]"
      />

      <UPagination
        v-model="currentPage"
        :page-count="perPage"
        :total="users.length"
        :prev-button="{
          label: 'Prev',
          color: 'gray'
        }"
        :next-button="{
          trailing: true,
          label: 'Next',
          color: 'gray'
        }"
      />
    </div>
  </UContainer>
</template>
