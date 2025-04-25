import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import cfg from '@/../config.json'

export const sanityClient = createClient({
  projectId: cfg.sanity.projectId,
  dataset: cfg.sanity.dataset,
  apiVersion: '2025-04-19',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
