import {errors} from '../../errors'
import {is_object} from '../util'
import got from 'got'

let Authorization = null
const login = async (url, identifier, password) => {
  if(Authorization !== null) { return }

  const json = {identifier, password}
  const body = await got.post(`${url}/auth/local`, {json}).json()

  Authorization = `Bearer ${body.jwt}`
}

const get_path = (content_type, id_or_params) => {
  let path = `/${content_type}`

  if(!is_object(id_or_params)) {
    path += `/${id_or_params}`
  }

  return path
}

export async function get_strapi_da(endpoint, identifier, password) {
  try {
    await login(endpoint, identifier, password)
    const options = {headers: {Authorization}}

    return {
      get: async (content_type, id_or_params = {}) => {
        const path = get_path(content_type, id_or_params)
        if(is_object(id_or_params)) { options.searchParams = id_or_params }

        return await got(`${endpoint}${path}`, options).json()
      },
      getFiles: async () => await got(`${endpoint}/upload/files`, options).json()
    }
  }
  catch (error) {
    const new_error = new Error(`strapi: ${error.message}`, {cause: error})
    new_error.name = errors.DATA_ACCESS

    throw new_error
  }
}
