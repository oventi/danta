import {readFileSync} from 'fs'
import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import {spawn} from 'child_process'
import path from 'path'
import dotenvJSON from 'dotenv-json'

import {start_dev_server} from '../dev'
import {build_project} from '../build'

const argv = yargs(hideBin(process.argv)).argv
const base_dir = path.resolve(process.cwd())
const env = argv.env || `${base_dir}/env.json`
const parcel_params = ['./css/index.scss', './js/index.js', './assets/**', '--no-cache']

dotenvJSON({path: env})

if(argv.dev) {
  const parcel = spawn('yarn', ['parcel', 'watch', ...parcel_params])
  parcel.stdout.pipe(process.stdout)
  parcel.stderr.pipe(process.stderr)

  start_dev_server(argv, base_dir)
}
else if(argv.build) {
  const parcel = spawn('yarn', ['parcel', 'build', ...parcel_params])
  parcel.stdout.pipe(process.stdout)
  parcel.stderr.pipe(process.stderr)

  ;(async () => await build_project(argv, base_dir))()
}
else {
  console.error('invalid danta command')
  process.exit(1)
}
