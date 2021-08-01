import {start_dev_server} from '../dev'
import {readFileSync} from 'fs'
import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import {spawn} from 'child_process'
import path from 'path'
import dotenvJSON from 'dotenv-json'

const argv = yargs(hideBin(process.argv)).argv

if(argv.dev) {
  const base_dir = path.resolve(process.cwd())
  const env = argv.env || `${base_dir}/env.json`

  dotenvJSON({path: env})

  const css = spawn('yarn', [
    'parcel', 'watch', './css/index.scss', './js/index.js', './assets/**', '--no-cache'
  ])
  css.stdout.pipe(process.stdout)
  css.stderr.pipe(process.stderr)

  start_dev_server(argv, base_dir)
}
else if(argv.build) {

}
else {
  console.error('invalid danta command')
  process.exit(1)
}
