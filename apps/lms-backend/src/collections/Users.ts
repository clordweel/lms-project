import type { Auth, Media, User } from '@/payload-types'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            width: '16rem',
          }
        },
        {
          name: 'gender',
          type: 'select',
          options: [{ value: 'male', label: '男' }, { value: 'female', label: '女' }],
          admin: {
            width: '16rem',
          }
        },
        {
          name: 'age',
          type: 'number',
          admin: {
            width: '16rem',
          }
        },
        {
          name: 'birthday',
          type: 'date',
          admin: {
            width: '16rem',
          }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '20rem',
          }
        },
        {
          name: 'email',
          type: 'text',
          admin: {
            width: '20rem',
          }
        },
      ]
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { value: 'super', label: '超级管理员' },
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '用户' },
        { value: 'student', label: '学生' },
        { value: 'teacher', label: '教师' },
      ],
      admin: {
        position: 'sidebar',
      }
    },
  ],
  endpoints: [
    {
      path: '/me',
      method: 'get',
      handler: async (args) => {
        const { id, name, avatar, email, phone, age, gender, ...rest } = (args.user as Auth).user as User
        return Response.json({
          rest,
          userId: id,
          realName: name,
          roles: ['super'],
          email,
          phone,
          age,
          gender,
          avatar: (avatar as Media)?.url,
        })
      },
    },
  ]
}
