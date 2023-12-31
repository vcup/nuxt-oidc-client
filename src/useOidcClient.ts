import { UserManager } from 'oidc-client-ts'
import { useState, useRequestURL } from '#imports'
import type { ModuleOptions } from './module.js'

export const useOidcClient = () => useState('oidc-client', () => {
  const options = {} as ModuleOptions
  const { origin, hostname } = useRequestURL()
  if (!options.callback_path) {
    options.callback_path = origin + '/oidc/callback'
  }

  const settings = {
    ...options.settings,
    authority: options.authority ?? origin,
    client_id: options.client_id ?? hostname,
    redirect_uri: options.callback_path
  }

  const userManager = new UserManager(settings)

  return {
    userManager,
    isAuthenticated: async () => await userManager.getUser() ? true : false,
  }
}).value