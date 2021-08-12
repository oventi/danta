import {spawn} from 'child_process'
import {divider} from './util'

const argv_rest = ['./css/index.scss', './js/index.js', './assets/**', '--no-cache']

export const watch = () => {
  console.log('- watching css, js and assets...')

  const parcel = spawn('yarn', ['--silent', 'parcel', 'watch', ...argv_rest])

  parcel.stderr.pipe(process.stderr)

  parcel.stdout.on('data', data => {
    const message = data.toString()

    if(message.indexOf('Building') !== -1) {
      console.log(divider)
    }

    process.stdout.write(message)
  })
}

export const build = () => {

}
