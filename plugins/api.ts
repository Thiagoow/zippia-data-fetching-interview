export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      responseType: 'json',
      baseURL: useRuntimeConfig().public.apiUrl as string,
      onRequest: ({ request, options }) => {}
    })

    return {
      provide: { api }
    }
  }
})
