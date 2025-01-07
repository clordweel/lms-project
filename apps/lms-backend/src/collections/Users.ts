import { vbenResponseHook } from '@/lib/vben/hooks'
import { vbenResponse } from '@/lib/vben/response'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  hooks: {
    afterOperation: [
      vbenResponseHook
    ]
  },
  endpoints: [
    {
      path: '/me',
      method: 'get',
      handler: async (args) => {
        return vbenResponse({...args.user, roles: ['super']}, 0)
      },
    },
  ]
}
