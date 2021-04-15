import {readFileSync} from 'fs'
import Ajv from 'ajv'

export async function validate_data(project_data, builder_path) {
  const ajv = new Ajv()
  const schema = JSON.parse(await readFileSync(`${builder_path}/schema.json`))
  const validate = ajv.compile(schema)

  return {
    valid: validate(project_data),
    errors: validate.errors
  }
}
