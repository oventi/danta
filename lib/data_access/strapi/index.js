import got from 'got'
import {get_jwt, get_path} from './helpers'
import {errors} from '../../../errors'
import {is_object} from '../../util'

export async function get_strapi_da(endpoint, identifier, password) {
  try {
    const jwt = await get_jwt(endpoint, identifier, password)
    const client = got.extend({
      prefixUrl: endpoint, headers: {Authorization: `Bearer ${jwt}`},
      responseType: 'json', resolveBodyOnly: true
    })

    return {
      get: async (content_type, id_or_params = {}) => {
        const path = get_path(content_type, id_or_params)
        const options = is_object(id_or_params) ? {searchParams: id_or_params} : {}

        return await client.get(path, options)
      },
      getFiles: async () => await client.get('upload/files')
    }
  }
  catch (error) {
    console.error(error)
    const new_error = new Error(`strapi: ${error.message}`, {cause: error})
    new_error.name = errors.DATA_ACCESS

    throw new_error
  }
}
