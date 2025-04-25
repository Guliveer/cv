import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'
import {config} from './config'

export default defineConfig({
  name: 'default',
  title: 'Studio',

  projectId: config.projectId,
  dataset: config.dataset,

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
