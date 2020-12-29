# danta

A toolkit to create static websites or apps using a JSON data (including headless CMS), templates using mustache/html5, css and javascript. Its focus is on helping non profits and activist causes.

## components

Danta has builders and projects. A builder is a generic process that takes specific data and generates a static website or app. A project is the process to get and prepare data (usually from a headless CMS) and write custom css and other code for a static website or app. Both projects and builder can use

### builder
- MUST go in the `builders` folder (it can be a symlink)
- MUST have an `index.js` that exports `async function build(project_name, templates, data)`
- MUST have a `templates` folder with at least one file with mustache
- MUST have a `schema.json` file to validate data from the project
- CAN have a folder `scss` for css, but MUST have `scss/index.scss` as entry point

### project
- MUST go in the `projects` folder (it can be a symlink)
- MUST have an `index.js` that exports `async function get_data(stage)`
- CAN have a folder `scss` for custom css, but MUST have `scss/index.scss` as entry point

## installation
- run `yarn link` in `./lib`
- add symblinks in builders and projects
- run `yarn link danta` in each builder and project

## usage
- An organisation wants to create a microsite based on the 2020 builder
- The ActionStation builder is called asar (ActionStation Annual Report)
- `yarn build <project> <builder>`
