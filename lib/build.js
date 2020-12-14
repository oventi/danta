import {get_templates} from './builder/templates'
import {start_server} from './server'

const DEV_PORT = 8080
const DEV_BASE_URL = `http://localhost:${DEV_PORT}`

const [,, project_name, builder_name, stage, ...params] = process.argv
const project = require(`../projects/${project_name}`)
const builder = require(`../builders/${builder_name}`)

;(async () => {
  const templates = get_templates(`./builders/${builder_name}/templates`)
  const project_data = await project.get_data()
  const data = {
    ...project_data,
    base_url: stage === 'prod' ? project_data.base_url : DEV_BASE_URL
  }

  await builder.build(project_name, templates, data)

  start_server(project_name, DEV_PORT)
})()
