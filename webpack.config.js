// https://www.robertcooper.me/front-end-javascript-environment-variables

const webpack = require('webpack')

module.exports = env => {

  console.log(env)
  
  const is_production = new Boolean(env && env.production).valueOf()
  const webpack_mode = is_production ? 'production' : 'development'
  const env_mode = is_production ? 'prod' : 'dev'
  //const app_env = require(`/var/local/members_${env_mode}.json`)
  const app_env = {}

  return {
    entry: './client/index.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'index.js'
    },
    mode: webpack_mode,
    plugins: [
      new webpack.DefinePlugin({'process': JSON.stringify({env: app_env})})
    ]
  }
}
