<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script lang="ts" setup>
import { useOidcClient } from '#imports'
onMounted(async () => {
  const oidc = await useOidcClient()
  console.info(oidc, oidc.userManager.settings, useOidcClient)
})
</script>
