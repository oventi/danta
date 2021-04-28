import {execSync as exec} from 'child_process'
import config from '../default_config'
import {get_templates} from './templates'
import {validate_data} from './validators'
import {make_dir} from '../lib'

export const build = async (project, builder, stage = 'dev') => {
  const BASE_URL = process.env.BASE_URL || config.BASE_URL
  const [protocol, host, port] = BASE_URL.split(':')
  const PORT = parseInt(port, 10) || 2810

  const DIST_PATH = `./dist/${project.name}`
  const ts = Date.now()

  // TODO: check if the scss file and folder exist
  exec(`yarn sass ${builder.path}/scss/index.scss ${DIST_PATH}/builder.css`)
  exec(`yarn sass ${project.path}/scss/index.scss ${DIST_PATH}/project.css`)

  make_dir(`${DIST_PATH}/assets`)

  // TODO: check if the assets folder exists
  exec(`cp ${builder.path}/assets/* ${DIST_PATH}/assets/.`)
  exec(`cp ${project.path}/assets/* ${DIST_PATH}/assets/.`)

  const templates = get_templates(`${builder.path}/templates`)
  const project_data = await project.get_data(stage)

  const {valid, errors} = await validate_data(project_data, builder.path)
  if(!valid) {
    return console.error(errors)
  }

  const data = {
    ...project_data,
    base_url: `${protocol}:${host}:${PORT}`,
    css: `
    <link href="/builder.css?ts=${ts}" rel="stylesheet">
    <link href="/project.css?ts=${ts}" rel="stylesheet">
    `
  }

  await builder.build(project.name, templates, data)
}
