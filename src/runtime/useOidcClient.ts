import { UserManager } from 'oidc-client-ts'
import { useState, useRequestURL } from '#imports'
import type { ModuleOptions } from '../module.ts'

export const useOidcClient = () => useState('oidc-client', async () => {
  const options = {} as ModuleOptions
  let { origin, hostname } = useRequestURL()
  let callback_path ='/oidc/callback'

  if (options.origin) origin = options.origin
  if (options.hostname) hostname = options.hostname
  if (options.callback_path) callback_path = options.callback_path

  const settings = {
    ...options.settings,
    authority: origin,
    client_id: hostname,
    redirect_uri: origin + callback_path
  }

  const userManager = new UserManager(settings)

  return {
    userManager,
    isAuthenticated: async () => await userManager.getUser() ? true : false,
  }
}).value