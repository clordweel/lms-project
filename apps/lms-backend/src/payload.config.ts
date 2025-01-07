// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from "payload/i18n/en";
import { zh } from "payload/i18n/zh";
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Auth } from './collections/Auth'
import { Users } from './collections/Users'
import { vbenResponse } from './lib/vben/response'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: 'default',
  },
  collections: [Admins, Media, Auth, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "中文",
        code: "zh",
      },
    ],
    defaultLocale: "zh", // required
  },
  i18n: {
    supportedLanguages: { en, zh },
    fallbackLanguage: "zh",
    translations: {
      zh: {
        translations: zh,
      },
      en: {
        translations: en,
      },
    },
  },
  endpoints: [
    {
      path: '/user/info',
      method: 'get',
      handler: async (args) => {
        return vbenResponse(args.user)
      },
    }
  ],
})
