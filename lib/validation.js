import {errors} from '../errors'
import Ajv from 'ajv'

export function validate_data(data, schema) {
  const ajv = new Ajv({allErrors: true})

  const validate = ajv.compile(schema)
  const valid = validate(data)
  if(!valid) {
    const error = new Error(validate.errors[0].message)
    error.name = errors.PROJECT

    throw error
  }

  return true
}
