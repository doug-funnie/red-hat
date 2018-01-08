## Exercise3 - Sample Project

All source code for this project is located in `./src/` with an entry file of `./src/index.tsx`

### Setup
If you are not using the workspaces feature you will need to run `npm install` at the root of this exercise. If you are using workspaces, simply run `yarn` at the root of the repo.

### Testing
Testing is ran at the root of this repo.  If you are not using workspaces you will need to install the deps in this project first then run the tests.

### Running
**Workspaces:** Run `yarn start:exercise3` at the root of the repo

**NPM:** run `npm start` at the root of this exercise.

This wil; start webpack-dev-server, and serve the results at [http://localhost:3000](http://localhost:3000)

### Building
**Workspaces:** Run `yarn build:exercise3` at the root of the repo.

**NPM:** run `npm run build` at the root of this exercise.

This will bundle all files in production mode with minification and output them to `./dist/`
