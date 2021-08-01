import dotenvJSON from 'dotenv-json'
import {existsSync as file_exists} from 'fs'
import {execSync as exec} from 'child_process'

import {make_dir} from '../lib'
import {build} from './'

const [,, project_name, builder_name] = process.argv

dotenvJSON({ path: `/var/local/${project_name}_build.json`});

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

  console.log('Compressing files...')
  exec(`cd ./dist; tar cfz ${project_name}.tar.gz ${project_name}/ && rm -Rf ${project_name}/`)
})()
