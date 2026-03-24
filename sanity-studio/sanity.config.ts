import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'jasnauskaite',
  title: '@jasnauskaite — Content Manager',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7rtvhbsv',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
