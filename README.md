# danta

a set of tools, frameworks, code and boilerplate to generate static sites and
apps with a headless cms, html5, javascript and css.

## installation
- run `yarn link` in `./lib`
- add symblinks in builders and projects
- run `yarn link danta` in each builder and project

## specific enforcements
danta requires certain languages, formats and frameworks to be used

- json as cms data
- mustache for templates
- scss for stylesheets

## building process
- you must have at least 1 builder on `./builders`
- TBD


## Example scenario
- An organisation wants to create a microsite based on the builder from ActionStation
- The ActionStation builder is called asar (ActionStation Annual Report)
- `yarn build <project> <builder>` (located in ./builders/2020)
