import {execSync as exec} from 'child_process'
import config from '../default_config'
import {get_templates} from './templates'
import {validate_data} from './validators'
import {make_dir} from '../lib'

export const build = async (project, builder, stage = 'dev') => {
  const BASE_URL = process.env.BASE_URL || config.BASE_URL
  const [protocol, host, port] = BASE_URL.split(':')
  const dev_port = parseInt(port, 10) || 2810
  const PORT = stage === 'dev' ? `:${dev_port}` : ''

  const DIST_PATH = `./dist/${project.name}`
  const ts = Date.now()

  // TODO: check if the scss file and folder exist
  exec(`yarn sass ${builder.path}/scss/index.scss ${DIST_PATH}/builder.css`)
  exec(`yarn sass ${project.path}/scss/index.scss ${DIST_PATH}/project.css`)

  make_dir(`${DIST_PATH}/assets`)

  // TODO: check if the assets folder exists
  exec(`cp -r ${builder.path}/assets/* ${DIST_PATH}/assets/.`)
  exec(`cp -r ${project.path}/assets/* ${DIST_PATH}/assets/.`)

  const templates = get_templates(`${builder.path}/templates`)
  const project_data = await project.get_data(stage)

  const {valid, errors} = await validate_data(project_data, builder.path)
  if(!valid) {
    return console.error(errors)
  }

  const base_url = `${protocol}:${host}${PORT}`
  const data = {
    ...project_data,
    base_url,
    css: `
    <link href="${base_url}/builder.css?ts=${ts}" rel="stylesheet">
    <link href="${base_url}/project.css?ts=${ts}" rel="stylesheet">
    `
  }

  await builder.build(project.name, templates, data)
}
