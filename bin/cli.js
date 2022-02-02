import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import path from 'path'
import dotenvJSON from 'dotenv-json'
import {rmdirSync} from 'fs'

import {build} from '../lib/parcel'
import {start_dev_server} from '../dev'
import {build_project} from '../build'
import {errors} from '../errors'

const argv = yargs(hideBin(process.argv)).argv
const base_dir = path.resolve(process.cwd())
const env = argv.env || `${base_dir}/.env.json`

dotenvJSON({path: env})

rmdirSync(`${base_dir}/dist`, {recursive: true})

if(argv.dev) {
  console.log(['', '***** danta dev *****'].join('\n'))

  start_dev_server(argv, base_dir).then(() => console.log(''))
}
else if(argv.build) {
  console.log(['', '***** danta build *****'].join('\n'))

  build(error => {
    console.error(['\n', errors.PARCEL, error.toString()].join('\n'))

    process.exit(2) // css, javascripts or assets error
  }).on('exit', code => {
    if(code === 0) {
      console.log('DONE')

      return build_project(argv, base_dir)
        .then(() => {
          console.log('DONE', '\n')
        })
        .catch(error => {
          console.error(['\n', errors.STATIC, error.message, ''].join('\n'))
          process.exit(3)
        })
    }

    console.error(`\n${errors.PARCEL_BUILD_UNDEFINED}\n`)
    process.exit(4)
  })
}
else {
  console.error('invalid danta command')
  process.exit(1)
}
