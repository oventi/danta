import {errors} from '../errors'
import {readFileSync} from 'fs'

const theme_get_schema = (theme_path) => {
  const schema_file = `${theme_path}/schema.json`
  const schema_json = readFileSync(schema_file, 'utf-8')

  try {
    return JSON.parse(schema_json)
  } catch(json_parse_error) {
    json_parse_error.name = errors.THEME_SCHEMA

    throw json_parse_error
  }
}

export const get_components = (base_dir, theme_name) => {
  const theme_path = `${base_dir}/node_modules/${theme_name}`

  delete require.cache[require.resolve(theme_path)]
  const theme = require(theme_path)
  theme.get_schema = () => theme_get_schema(theme_path)

  delete require.cache[require.resolve(base_dir)]
  const project = require(base_dir)

  return {theme, project}
}
