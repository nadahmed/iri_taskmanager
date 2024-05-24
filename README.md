# Task Manager

![Builds](https://github.com/nadahmed/iri_taskmanager/actions/workflows/builds.yml/badge.svg?event=push) ![Tests](https://github.com/nadahmed/iri_taskmanager/actions/workflows/tests.yml/badge.svg)

## Getting Started

To get started, clone the project from the [GitHub repository](https://github.com/nadahmed/iri_taskmanager)

```bash
git clone https://github.com/nadahmed/iri_taskmanager 
```

Then change the directory to `iri_taskmanager`

```bash
cd iri_taskmanager
```

## Running with Docker

Run the following commands to build and run the application in a Docker container.

1. Build the image:

    ```bash
    docker build -t nadahmed/iri-task-manager .    
    ```

2. Run server:

    ```bash
    docker run -p 4200:80 --rm --name iri-task-manager nadahmed/iri-task-manager
    ```

3. Browse to http://localhost:4200/

## Running with NPM

### Requirements

- Node version >= 18
- [Angular CLI](https://github.com/angular/angular-cli) version 17.

### Installation

Open the Terminal or command line and in your preferred project directory and do the following:

- Install dependecies using `npm install`


### Development server

- Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

- Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

- Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
