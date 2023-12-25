import { defineNuxtModule, createResolver, addImportsSources, addTemplate } from '@nuxt/kit'
import { readFile } from 'node:fs/promises'
import type { UserManagerSettings } from 'oidc-client-ts'

export interface ModuleOptions {
  /**
   * useOidcClient() composable using key in useState
   * @default 'oidc-client'
   */
  state_key?: string

  /**
   * @default { origin } = useRequestURL()
   */
  origin?: string

  /**
   * @default { hostname } = useRequestURL()
   */
  hostname?: string

  /**
   * @default /oidc/callback
   */
  callback_path?: string

  /**
   * The &lt;origin&gt; &lt;hostname&gt; and &lt;callback_path&gt; come from ModuleOptions
   * @default { origin, hostname, origin + callback_path }
   */
  settings?: UserManagerSettings
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'oidc-client',
    configKey: 'oidcClient'
  },
  defaults: {
    state_key: 'oidc-client',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    const useOidcClientPath = resolve(runtimeDir, 'useOidcClient.ts')
    addTemplate({
      filename: 'useOidcClient.ts',
      getContents: async () => {
        const file = await readFile(useOidcClientPath)
        const result = file.toString()
          .replace(/{options.state_key}/, options.state_key!)
          .replace(/(?<=\s+const options = ){}(?= as ModuleOptions)/, JSON.stringify(options))
        return result
      },
      write: true,
    })

    addImportsSources({
      from: resolve(nuxt.options.buildDir, 'useOidcClient.ts'),
      imports: [ 'useOidcClient' ]
    })
  }
})
