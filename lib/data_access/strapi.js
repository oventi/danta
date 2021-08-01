import Strapi from 'strapi-sdk-javascript'
import {is_object} from '../util'

export async function get_strapi_da(url, username, password) {
  try {
    const client = new Strapi(url)
    await client.login(username, password)

    return {
      get: async (content_type, id_or_params = {}) => {
        if(is_object(id_or_params)) {
          return client.getEntries(content_type, id_or_params)
        }

        return client.getEntry(content_type, id_or_params)
      },
      getFiles: async (params = {}) => client.getFiles(params)
    }
  }
  catch(error) {
    console.error('[danta] get_strapi_da error', error.message)
  }
}
