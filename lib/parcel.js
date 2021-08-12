import {spawn} from 'child_process'
import {divider} from './util'

const argv_rest = ['./css/index.scss', './js/index.js', './assets/**', '--no-cache']

export const watch = ({on_error}) => {
  console.log('- watching css, js and assets...')

  const parcel = spawn('yarn', ['--silent', 'parcel', 'watch', ...argv_rest])

  parcel.stderr.pipe(process.stderr)
  parcel.stderr.on('data', on_error)

  parcel.stdout.on('data', data => {
    on_error(null) // clear parcel errors for dev server

    const message = data.toString()

    if(message.indexOf('Building') !== -1) {
      console.log(divider)
    }

    process.stdout.write(message)
  })
}

export const build = () => {

}
