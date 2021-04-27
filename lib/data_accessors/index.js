import {createClient} from 'contentful'
import {contentful_prepare} from './contentful_prepare'

export function get_contentful_da(access_token, space) {
  const client = createClient({accessToken: access_token, space})

  return {
    get: async (params, include = 10) => {
      const {items: [data]} = await client.getEntries({...params, include})

      return contentful_prepare(data)
    }
  }
}
