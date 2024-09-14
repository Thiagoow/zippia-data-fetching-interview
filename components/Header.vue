<template>
  <div class="flex items-center gap-4">
    <div class="flex flex-wrap items-center justify-between flex-1 gap-2">
      <div class="flex items-stretch gap-2">
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
      </div>

      <div class="flex items-stretch gap-2">
        <UInput
          v-model="internalQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Filter users by name..."
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="internalQuery !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="clearQuery"
            />
          </template>
        </UInput>

        <UButton
          color="gray"
          :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
          label="Toggle Theme"
          @click="colorMode.preference = isDark ? 'light' : 'dark'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  pending: {
    type: Boolean,
    required: true
  },
  getUsers: {
    type: Function as PropType<() => void>,
    required: true
  },
  deleteUsers: {
    type: Function as PropType<() => void>,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const internalQuery = ref(props.modelValue)

watch(internalQuery, (newQuery) => {
  emit('update:modelValue', newQuery)
})

const clearQuery = () => {
  internalQuery.value = ''
}
</script>
