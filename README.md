# danta
A toolkit to create websites or apps, focused on social impact projects.

## tech stack
[JSON data](https://beginnersbook.com/2015/04/json-tutorial/), templates using [mustache](https://github.com/janl/mustache.js/blob/master/README.md)/html5, css and javascript. Built to run on GNU/Linux machines.

## quickstart
[Detailed how-to](docs/how_to.md)

## what has been built with it?
- [ActionStation 2020 Annual Report](https://actionstation.org.nz/annual-reports/2020)
- [Migrants Aotearoa website](https://migrantsaotearoa.org.nz/)
- [Andrés Proaño Valencia (oventi) single page](https://oventi.org/)

## how does it work?
Danta's purpose is to serve as a development tool, run in the command line and then create static bundles for deployment in [object storage](https://en.wikipedia.org/wiki/Object_storage).

Danta has builders and projects. A builder is a generic process that takes specific data and creates a static website or app. A project is the process to get and prepare data (from a JSON file or headless CMS) and use custom code for a static website or app. To use WordPress as a comparison, **a builder is equivalent to a theme, and a project equivalent to a single installation**.
