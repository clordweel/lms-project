import type { CollectionConfig } from 'payload'
import { vbenResponseHook } from '@/lib/vben/hooks'
import { vbenResponse } from '@/lib/vben/response'

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
      hasMany: false,
    }
  ],
  endpoints: [
    {
      path: '/codes',
      method: 'get',
      handler: async (args) => {
        return Response.json({
          codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
          username: 'vben',
        })
      },
    }
  ]
}

