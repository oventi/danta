# danta
A toolkit to create websites or apps, focused on social impact projects.

## tech stack
[JSON data](https://beginnersbook.com/2015/04/json-tutorial/), templates using [mustache](https://github.com/janl/mustache.js/blob/master/README.md)/html5, css and javascript. Built to run on GNU/Linux machines.

## quickstart
TBD

## what has been built with it?
- [ActionStation 2020 Annual Report](https://actionstation.org.nz/annual-reports/2020)
- [Migrants Aotearoa website](https://migrantsaotearoa.org.nz/)
- [Andrés Proaño Valencia (oventi) single page](https://oventi.org/)

## how does it work?
Danta's purpose is to serve as a development tool, run in the command line and then create static bundles for deployment in [object storage](https://en.wikipedia.org/wiki/Object_storage).

Danta has builders and projects. A builder is a generic process that takes specific data and creates a static website or app. A project is the process to get and prepare data (from a JSON file or headless CMS) and use custom code for a static website or app.

### builders
- Must go in the `builders` folder (symlink recommended)
- Must have an `index.js` that exports `async function build(project_name, templates, data)`
- Must have a `templates` folder with at least one mustache file
- Must have a `schema.json` file to validate data from the project
- Can have a folder `scss` for css, but if it does, it must have `scss/index.scss` as entry point

### project
- Must go in the `projects` folder (symlink recommended)
- Must have an `index.js` that exports `async function get_data(stage)`
- Can have a folder `scss` for custom css, but if it does, it must have `scss/index.scss` as entry point

## installation
- run `yarn link` in `./lib`
- add symblinks in builders and projects
- run `yarn link danta` in each builder and project

## usage
- An organisation wants to create a microsite based on the 2020 builder
- The ActionStation builder is called asar (ActionStation Annual Report)
- `yarn build <project> <builder>`
