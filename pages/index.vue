<script setup lang="ts">
useHead({ title: 'Zippia - Test Project' })
import { userRepository } from '~/repository/user'

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
    label: 'Username',
    sortable: true
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
  if (!users.value.length) return []
  const handledQuery = query.value.trim().toLowerCase()

  const filteredUsers = handledQuery
    ? users.value.filter((user) => user.name.toLowerCase().includes(handledQuery))
    : users.value

  const startIndex = (currentPage.value - 1) * perPage.value
  return filteredUsers.slice(startIndex, startIndex + perPage.value)
})
</script>

<template>
  <UContainer class="flex flex-col gap-y-5 py-14">
    <Header v-model="query" :pending="pending" :getUsers="getUsers" :deleteUsers="deleteUsers" />

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
          { value: 10, label: '10 rows per page' },
          { value: 5, label: '5 rows per page' }
        ]"
      />

      <UPagination
        v-model="currentPage"
        :page-count="Number(perPage)"
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
