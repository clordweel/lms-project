import type { CollectionConfig } from 'payload'
import { vbenResponseHook } from '@/lib/vben/hooks'

export const Auth: CollectionConfig = {
  slug: 'auth',
  labels: {
    singular: {
      en: "Auth",
      zh: "认证",
    },
    plural: {
      en: "Auth",
      zh: "认证",
    },
  },
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      requireUsername: true,
      allowEmailLogin: true,
      requireEmail: false,
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    }
  ],
  hooks: {
    afterOperation: [
      async ({ operation, result }) => {
        if (operation === 'login') {
          Object.assign(result, {
            accessToken: result.token,
            refreshToken: result.token,
          })
          delete result.token
        }
      },
      vbenResponseHook,
    ],
  },
}

