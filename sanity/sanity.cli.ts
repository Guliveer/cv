import {defineCliConfig} from 'sanity/cli'
import {config} from './config'

export default defineCliConfig({
  api: {
    projectId: config.projectId,
    dataset: config.dataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
