import {existsSync as file_exists} from 'fs'

import {make_dir} from './'
import {build} from './builder/build'

const [,, project_name, builder_name] = process.argv

const project = require(`../projects/${project_name}`)
project.name = project_name
project.path = `./projects/${project_name}`

const builder = require(`../builders/${builder_name}`)
builder.name = builder_name
builder.path = `./builders/${builder_name}`

const DIST_PATH = `./dist/${project_name}`

;(async () => {
  make_dir(DIST_PATH)

  console.log(`Building ${project_name}...`)
  await build(project, builder, 'prod')
  console.log('DONE')
})()
