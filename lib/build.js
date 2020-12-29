import Ajv from 'ajv'
import {execSync as exec} from 'child_process'
import {readFileSync} from 'fs'

import {get_templates} from './builder/templates'
import {make_dir} from './'
import {start_server} from './server'

const [,, project_name, builder_name, stage, ...params] = process.argv

const DEV_PORT = 2810
const DEV_BASE_URL = `http://localhost:${DEV_PORT}`
const PROJECT_PATH = `./projects/${project_name}`
const BUILDER_PATH = `./builders/${builder_name}`
const DIST_PATH = `./dist/${project_name}`

const project = require(`../projects/${project_name}`)
const builder = require(`../builders/${builder_name}`)

;(async () => {
  make_dir(DIST_PATH)

  exec(`yarn sass ${BUILDER_PATH}/scss/index.scss ${DIST_PATH}/${builder_name}.css`)
  exec(`yarn sass ${PROJECT_PATH}/scss/index.scss ${DIST_PATH}/custom.css`)

  const templates = get_templates(`${BUILDER_PATH}/templates`)
  const project_data = await project.get_data()

  const ajv = new Ajv()
  const schema = JSON.parse(await readFileSync(`${BUILDER_PATH}/schema.json`))
  const validate = ajv.compile(schema)
  const valid = validate(project_data)
  if (!valid) {
    return console.error(validate.errors)
  }

  const ts = Date.now()
  const data = {
    ...project_data,
    base_url: stage === 'prod' ? project_data.base_url : DEV_BASE_URL,
    css: `
    <link href="/${builder_name}.css?ts=${ts}" rel="stylesheet">
    <link href="/custom.css?ts=${ts}" rel="stylesheet">
    `
  }

  await builder.build(project_name, templates, data)

  start_server(project_name, DEV_PORT)
})()
