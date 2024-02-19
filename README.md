# TOP app (Toezicht op pad)

De TOP app verzorgt de informatievoorziening voor toezichthouders op pad. Door middel van een variabele configuratie kunnen zij een looplijst van adressen samenstellen.

## Install

Clone this repository and install its dependencies:

```bash
git clone https://github.com/Amsterdam/top-frontend.git
cd top-frontend
npm install
```

Fetch the latest API schemas:

```
npm run swagger:generate-schema:acc
```

## Running

Using the acceptance backend is easiest:

```
npm start
```

To use a local backend, clone the [backend repository](https://github.com/Amsterdam/top-backend) and run
the Docker instances.

```
npm run start:local
```

## Deploying

The `main` branch is automatically deployed to [acceptance](https://acc.top.amsterdam.nl/).

Tag any branch, but preferably main, with a tag like `v1.0.0` to deploy that specific commit
to [production](https://top.amsterdam.nl/).

## Storybook

Component documentation is in progress.

```
npm run storybook
```

## About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
