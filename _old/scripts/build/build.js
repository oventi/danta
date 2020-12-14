import {execSync} from 'child_process'
import path from 'path'
import webpack from 'webpack'
import {writeFileSync} from 'fs'

import {fetch_data} from './fetch_data'
import {build_html} from './build_html'

;(async () => {
  // run webpack-cli to js

  const app_env = {}

  execSync('yarn run webpack')

  // run sass for scss

  //const data = await fetch_data()
  //const html = await build_html(data)

  //writeFileSync('./dist/index.html', html)
})()



//import {execSync} from 'child_process'

//execSync('')

//const x = execSync('ls -all')

//console.log(x.toString('utf-8'))
