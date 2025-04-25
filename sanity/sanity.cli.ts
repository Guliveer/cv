import {defineCliConfig} from 'sanity/cli'
import sanity from './config'

export default defineCliConfig({
  api: {
    projectId: sanity.projectId,
    dataset: sanity.dataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
