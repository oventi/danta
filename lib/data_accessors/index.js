import Strapi from 'strapi-sdk-javascript'
import {createClient} from 'contentful'
import {contentful_prepare} from './contentful_prepare'

const is_object = (o) => Object.prototype.toString.call(o) === '[object Object]'

export function get_contentful_da(access_token, space) {
  const client = createClient({accessToken: access_token, space})

  return {
    get: async (params, include = 10) => {
      const {items: [data]} = await client.getEntries({...params, include})

      return contentful_prepare(data)
    }
  }
}

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
  catch(e) {
    console.error(e)
  }
}
