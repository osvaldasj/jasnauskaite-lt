import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7rtvhbsv',
    dataset: 'production',
  },
  deployment: {
    appId: 'b4coeoxlooxw5j7tve37owef',
  },
})
