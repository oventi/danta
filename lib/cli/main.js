import dotenvJSON from 'dotenv-json'
import {make_dir} from '../'
import {start_server} from './server'

const [,, stage, builder_name] = process.argv
console.log(stage, builder_name)

const CWD = process.cwd()
const DIST = `${CWD}/dist`

console.log(CWD)

//dotenvJSON({ path: `/var/local/${project_name}_dev.json`});

const project = require(CWD)
project.path = `.`

const builder = require(`${CWD}/builders/${builder_name}`)
builder.name = builder_name
builder.path = `${CWD}/builders/${builder_name}`

make_dir(DIST)

start_server(project, builder, DIST)

/*

console.log(stage)

const project_path = process.cwd()

const pkg = require(`${project_path}/package.json`)

console.log(pkg)

//console.log(process.env)







const [,, project_name, builder_name] = process.argv

dotenvJSON({ path: `/var/local/${project_name}_dev.json`});

const project = require(`../projects/${project_name}`)
project.name = project_name
project.path = `./projects/${project_name}`

const builder = require(`../builders/${builder_name}`)
builder.name = builder_name
builder.path = `./builders/${builder_name}`

const DIST_PATH = `./dist/${project_name}`
make_dir(DIST_PATH)

start_server(project, builder)

*/
