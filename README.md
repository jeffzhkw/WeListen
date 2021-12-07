# Getting Started with WeListen Project

WeListen is built using React library and Flask. It's a senior design project made by [Meihui Jin](https://github.com/MikoJin99), [Yanjun Meng](https://github.com/ymeng1834), [Chris Xu](https://github.com/chrisxhhh/), [Kewei Zhang](https://github.com/jeffzhkw/).

# Step by step guide for environment setup.

## 0. Prerequisite:

- Node.js: version @16.x.x
  - Use `node -v` to check version
- npm: version @8.x.x.
  - Use `npm -v` to check version
- python: version @3.7.x/@3.8.x.
  - Use `python3 -V` to check version.
- Homebrew
  - Download from https://brew.sh/
- Git
- Git CLI, gh installed: `brew install gh`
- Git set up with your github account: `gh auth login`
- A forked repo at your remote and cloned into your local machine
- Visual Studio Code

## 1. React: First Time Setup

### `cd front-end`

> Change dictionary to `front-end`

### `npm install`

> Install required packages for frontend debugging.

### Download `aws-exports.js` and move to `/front-end/src`

> Necessary configuration file for AWS authentication.

### Download `.env` and move to `/front-end`

> Environment variable that saves React keys.

### `npm start`

> Run under `front-end` dictionary.\
> It start a local server only with React components.
> See `front-end/README.md` for more details.

## 2. Flask: First Time Setup

Under project dictionary:

### `cd back-end`

> Change dictionary to `back-end`

### `python3 -m venv venv`

> Create your virtual environment called `(venv)`.\
> It's expected to run when setting up the python virtual environment for the first time.

### `source venv/bin/activate `

> Activate the virtual environment. \
> Once activated, you will see `(venv)` at the very front each line within the terminal

### `brew install postgresql`

> Install PostgreSQL database for later flask package install.

### `pip install -r requirements.txt`

> Run the command under `(venv)`.\
> Install packages stated in the requirement.txt into virtual environment.\
> Run every time after the .txt is modified by other developer.

### Download `API_KEYS.py` and move to `/back-end`

> Necessary configuration file for Youtube and database.

### Comment out `line 54` in file `/back-end/venv/lib/pafy/backend_youtube_dl.py`

> Fix Youtube remove dislike visibility

### `flask run`

> Start a development server.

## 3. Git: First Time Setup: [Configure Git Upstream](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork)

> Add root repo as a upstream.

# !----Attention for Git Version Control----!

## Important: Always do `git fetch upstream main` before staring any development process.

# Commands

# !----Backend Development----!

## Use virtual environement. Here are list of useful commands:

### `pip freeze > requirements.txt`

> Run the command under `(venv)`.\
> Save current packages information to requirement.txt.\
> Run for every inclusion of new packages.\
> Run before commit to github.

### `deactivate`

> Run the command under `(venv)`.\
> Exit the virtual environment.

### `python3 -m venv venv`

> Create your virtual environment called `(venv)`.\
> It's expected to run when setting up the python virtual environment for the first time.

### `source venv/bin/activate `

> Activate the virtual environment. \
> Once activated, you will see `(venv)` at the very front each line within the terminal

### `pip install -r requirements.txt`

> Run the command under `(venv)`.\
> Install packages stated in the requirement.txt into virtual environment.\
> Run every time after the .txt changed.

# To Move React Built Files to Flask

> Under `front-end` folder, in the terminal, type in sequence:

### `npm run build`

> Builds the app for production to the `/front-end/build` folder.\
> It correctly bundles React in production mode and optimizes the build for the best performance.\
> The build is minified and the filenames include the hashes.\
> Your app is ready to be deployed!

### `npm run clearFlask`

> Deletes the previous version in Flask folder(`/static` and `/template`).

### `npm run toFlask`

> Moves the built files from React folder(`/front-end/build`) to the Flask folder(`/static` and `/template`).
