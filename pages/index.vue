<script setup lang="ts">
useHead({ title: 'Encantômetro' })

import { userRepository } from '~/repository/user'

const { $api } = useNuxtApp()
const { pending, getUsers, users } = userRepository($api)

watch(users, () => {
  console.log(users.value)
})
</script>

<template>
  <UButton class="text-center" label="Fetch Users" :loading="pending" @click="getUsers" />
</template>
