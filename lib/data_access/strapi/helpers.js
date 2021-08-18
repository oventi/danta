import got from 'got'
import {is_object} from '../../util'

export const get_jwt = async (url, identifier, password) => await got.post(
  `${url}/auth/local`, {json:{identifier, password}}
).json().jwt

export const get_path = (content_type, id_or_params) => !is_object(id_or_params)
  ? `${content_type}/${id_or_params}`
  : content_type
