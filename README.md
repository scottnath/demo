# Punchcard Demo [![Build Status](https://travis-ci.org/punchcard-cms/demo.svg?branch=master)](https://travis-ci.org/punchcard-cms/demo) [![Coverage Status](https://coveralls.io/repos/github/punchcard-cms/demo/badge.svg?branch=master)](https://coveralls.io/github/punchcard-cms/demo?branch=master)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/punchcard-cms/demo)

Quickly deploy [Punchcard CMS](https://github.com/punchcard-cms/punchcard) to Heroku, or use this repository as an example to deploy Punchcard anywhere.

## Requirements

Punchcard is a [Node.js](https://nodejs.org/) based headless Content Management System that uses [PostgreSQL](https://www.postgresql.org/) as its database. It requires the following at a minimum to run:

* Node.js - **6.0 or greater**
* PostgreSQL - **9.5 or greater**

In addition, it is recommended that [Yarn](https://yarnpkg.com/) is used for package management. This repository does so as an example. All relevant commands will be using Yarn, but the relevant NPM commands can be found in Yarn's [migration documentation](https://yarnpkg.com/en/docs/migrating-from-npm). For `run` commands (like `yarn run build`), substitute `npm` for `yarn`.

## Running Locally

Ensure that PostgreSQL is available on the command line and accessible via the `postgres` command. Create a user that has a password `W@ts0n` and ensure that there is a `punchcard` database created.

If working on a Mac, [Homebrew](http://brew.sh/) is a convenient way to install PostgreSQL up and running. After installing Homebrew, do the following:

1. Update Homebrew - `brew update`
2. Install PostgreSQL - `brew install postgres`
3. Start the PostgreSQL Server - `postgres -D /user/local/var/postgres`
4. In a new terminal window or tab, create a new PostgreSQL user and set the password to `W@ts0n` when prompted - `createuser punchcard -P`
5. Create a local database - `createdb -0 punchcard punchcard`

### Local Development Commands

When working locally, there are two things that need to run: the database and the server. There are a number of helper scripts that ship with this repository to help with that:

* `yarn run dev:database` - Runs PostgreSQL, assuming it's been installed via Homebrew
* `yarn run dev:start` - Runs [Gulp](http://gulpjs.com/) default task, as defined in the [Punchcard Runner](https://github.com/punchcard-cms/runner)
* `yarn run dev` - Runs `dev:database` and `dev:start`
* `yarn run lint` - Runs the Gulp `lint` task, as defined in the Punchcard Runner
* `yarn run build` - Runs the Gulp `build` task, as defined in the Punchcard Runner
* `yarn test` - Runs `lint`, then [tests](#testing), then `build`

## Testing

Canonically, Punchcard uses [AVA](https://github.com/avajs/ava) for testing (both as a runner and as an assertion library) and [nyc](https://github.com/istanbuljs/nyc) for code coverage. Due to [outstanding issues in later versions](https://github.com/punchcard-cms/punchcard/pull/480#issuecomment-252640369), nyc is pegged to v6. JavaScript is [linted](http://snugug.github.io/linting-for-fun-and-profit/#/) using [ESLint Config Punchcard](https://github.com/punchcard-cms/eslint-config-punchcard), using the relevant configurations (`node`, `ava`, or `browser`). Sass is linted using [Sass Lint](https://www.npmjs.com/package/sass-lint).

The basic test that ships with this repository checks to ensure that Punchcard can run with any modifications an end-user may want to make to the application coming from Punchcard. Custom input plugins are tested using [Punchcard Shared Tests](https://github.com/punchcard-cms/shared-tests).

## Punchcard Boilerplate

The following files and folders represent a fairly basic example of Punchcard Boilerplate to get Punchcard up and running. They are divided in to [server](#server-boilerplate), [browser](#browser-boilerplate), [test](#test-boilerplate), and [config](#config-boilerplate). There are also generated files that can be mostly ignored.

### Server Boilerplate

Server boilerplate are required (marked with `*`) and optional files and folders to get Punchcard running. All files and folders are relative to the running root of the application.

* `index.js`* - The main file to actually run. The file presented is the bare minimum file recommended to make Punchcard both run and be testable. Punchcard is a Promise that returns a configured Express application that can be extended as if it were a local Express application.
* `config`* - Punchcard [config](https://www.npmjs.com/package/config) configuration files
  * `config/default.js`* - Default configuration to be shared regardless of environment. Extends the core Punchcard config to provide all default configuration. Without this configuration extension, Punchcard will not run.
  * `config/test.js` - Configuration to be used when the Node Environment is `test`. Recommended to use `sqlite3` for testing as it's faster than a full PostgreSQL database. Options present here override the default config and fall back to the default if not present.
  * `config/production.js` - Configuration to be used the Node Environment is `production`. Recommend for production environments, with Environment Variables used to hold keys and other secrets. Options present here override the default config and fall back to the default if not present.
* `content-types`* - The folder to hold [Content Types](https://github.com/punchcard-cms/content-types#defining-a-content-type) for use with Punchcard. Punchcard extends the Content Type definition with a top-level attribute `workflow` that should be set to an ID of a provided workflow (below).
  * `content-types/article.yml` - A basic content type for an article. Includes file upload, repeatable, and reference attributes.
  * `content-types/author.yml` - A basic content type for a content author. Includes a file upload attribute, as well as an attribute from a custom input plugin.
* `workflows`* -The folder to hold [workflows](https://github.com/punchcard-cms/punchcard/tree/master/workflows) for use with defined content types. Workflows can be set for a given content type by adding `workflow: ID` in a Content Type, with `ID` replaced by the ID of the approval workflow.
  * `workflows/self-publish.yml` - A workflow with one step that allows the individual who authored a piece of content to approve it
* `input-plugins` - The folder to hold custom [Input Plugins](https://github.com/punchcard-cms?utf8=%E2%9C%93&query=input-plugin) for use in Punchcard. A sample input plugin is provided.
  * `input-plugins/utils.js` - Helpful functions for creating custom input plugins
  * `input-plugins/input-plugin-address` - Custom Address input plugin
    * `input-plugins/input-plugin-address/README.md` - README for Address input plugin
    * `input-plugins/input-plugin-address/index.js` - Input plugin definition file
    * `input-plugins/input-plugin-address/package.json` - Basic [Node configuration](https://docs.npmjs.com/files/package.json) for custom input plugin. Custom input plugin dependencies should be saved to the [main Node configuration](#config-boilerplate)
* `views` - [Nunjucks](https://mozilla.github.io/nunjucks/) templates to be made available to Punchcard. Putting an identically named template at the identical relative path to a template in the core Punchcard module will overwrite the core template with the provided one
  * `views/content/add.html` - Template override for the Content Add template from Punchcard. Changes the URL of the provided browser JavaScript to the compiled one for the custom implementation.

### Browser Boilerplate

Browser boilerplate is based on the default source and destination targets using [Punchcard Runner](https://github.com/punchcard-cms/runner). These can be modified, and methods for compiling can be changed, as long as settings are updated as appropriate for Punchcard Runner.

* `src` - The folder to hold static files that will be served to the browser. Compiled versions will be made available in the `public` folder.
  * `src/images` - Images to be available in the browser. Will render to `public/images` and available in the `/images` folder from the browser
  * `src/js` - JavaScript files to be available in the browser. Will render to `public/js` and available in the `/js` folder from the browser
  * `src/sass` - Sass files to be rendered to CSS and available in the browser. Will render to `public/css` and available in the `/css` folder from the browser
    * `src/sass/style.scss` - Sass file that imports the Punchcard styling as an [eyeglass](https://github.com/sass-eyeglass/eyeglass) module. Will render to `public/css/style.css` and available at `/css/style.css` from the browser
* `Gulpfile.js` - Gulp task running file. The `application`, `server`, and `tasks.nodemon` configurations are for the server, whereas `tasks.build` is for the browser files. The two additional tasks, `punchcard:js` and `punchcard:images`, bring Punchcard provided JavaScript and Images in to this application's compiled `public` folder.

### Test Boilerplate

[Tests](#testing), while not required to run Punchcard, are recommended in order to ensure Punchcard runs and is extended as expected.

**AVA Tests**
* `tests` - Folder to run all tests
  * `tests/server.js` - Basic test using [SuperTest](https://www.npmjs.com/package/supertest) to ensure Punchcard is able to start
  * `tests/plugin.js` - Tests for the custom input plugin. Tests come from [Punchcard Shared Tests](https://github.com/punchcard-cms/shared-tests)

**Linting**
* `.eslintrc.yml` - [ESLint](https://www.npmjs.com/package/eslint) configuration for all Node code
* `.sass-lint.yml` - [Sass Lint](https://www.npmjs.com/package/sass-lint) configuration for all Sass code
* `src/js/.eslintrc.yml` - ESLint configuration for all Browser code
* `tests/.eslintrc.yml` - ESLint configuration for all Test code

### Config Boilerplate

There is a handful of general configuration files. Files that are required are marked with `*`.

* `.editorconfig` - [EditorConfig](http://editorconfig.org/) to hint to text editors how to behave
* `.gitignore` - Files and file patterns for Git to ignore
* `.nvmrc` - Node version for [Node Version Manager](https://github.com/creationix/nvm) to use. Helps ensure that the correct version of Node is being used given multiple versions of Node available on a system
* `.slugignore` - Files and file patterns to be ignored when Heroku (or Heroku-compatible system) builds the server deployment
* `.travis.yml` - Configuration file for [Travis](https://travis-ci.org/) Continuous Integration. Configures Travis to use Node 6, cache `node_modules` and Yarn's cache, install Yarn, run tests, and on success send code coverage to [Coveralls](https://coveralls.io/), create a new [semantic release](https://github.com/punchcard-cms/punchcard/blob/master/CONTRIBUTING.md#creating-a-release), update labels using [Reparo](https://reparo.herokuapp.com/), and deploy to Heroku after successful tests are run on the `master` branch, all while ignoring running any CI on release branches
* `Procfile` - Configuration file to tell Heroku (or Heroku-compatible system) what command to run for different contexts. Configures Heroku to run `yarn start` (the `start` script in `package.json`) when in a `web` context
* `app.json` - Heroku (or Heroku-compatible system) [application manifest](https://blog.heroku.com/introducing_the_app_json_application_manifest)
* `package.json`* - [Node configuration](https://docs.npmjs.com/files/package.json). In a production environment where deploys can happen from a Continuous Integration server, `gulp`, `gulp-concat`, `gulp-imagemin`, `gulp-uglify`, and `punchcard-runner` should all be `devDependencies` and the `prestart` script should not exist. All `dependencies` that start with `input-plugin-`, as well as `lodash`, are dependencies for the sample content types and the [custom input plugin](#server-boilerplate)
* `yarn.lock` - Generated [Yarn lock](https://yarnpkg.com/en/docs/yarn-lock)
