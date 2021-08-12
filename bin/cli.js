import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import path from 'path'
import dotenvJSON from 'dotenv-json'

import {build} from '../lib/parcel'
import {start_dev_server} from '../dev'
import {build_project} from '../build'

const argv = yargs(hideBin(process.argv)).argv
const base_dir = path.resolve(process.cwd())
const env = argv.env || `${base_dir}/env.json`

dotenvJSON({path: env})

if(argv.dev) {
  console.log(['', '***** danta dev *****'].join('\n'))

  start_dev_server(argv, base_dir).then(() => console.log(''))
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
