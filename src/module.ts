import { defineNuxtModule, createResolver } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'oidc-client',
    configKey: 'oidcClient'
  },
  defaults: {},
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
  }
})
