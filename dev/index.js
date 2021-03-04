import {make_dir} from '../lib'
import {start_server} from './server'

const [,, project_name, builder_name] = process.argv

const project = require(`../projects/${project_name}`)
project.name = project_name
project.path = `./projects/${project_name}`

const builder = require(`../builders/${builder_name}`)
builder.name = builder_name
builder.path = `./builders/${builder_name}`

const DIST_PATH = `./dist/${project_name}`
make_dir(DIST_PATH)

start_server(project, builder)
