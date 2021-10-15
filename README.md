# Getting Started with WeListen Project

WeListen is built using React library and Flask.

## To move React built files to Flask

Under front-end folder, in the terminal, type in sequence:

### `npm run build`

Builds the app for production to the `/front-end/build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run clearFlask`

Deletes the previous version on Flask

### `npm run toFlask`

Moves the built files from React folder(`/front-end/build`) to the Flask folder(`/static` and `/template`).
