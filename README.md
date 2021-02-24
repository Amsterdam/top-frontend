# TOP app (Toezicht op pad)

Dankzij de TOP app hebben toezichthouders Wonen veel informatie over zaken, adressen en bewoners bij de hand als zij op
straat hun werk doen. Ook kunnen zij hun eigen looplijst samenstellen, op basis van instellingen die planners hebben
klaargezet.

## Installing

Clone this repository and install its dependencies:

```bash
git clone https://github.com/Amsterdam/fixxx-looplijsten-frontend.git
cd fixxx-looplijsten-frontend
npm install .
```

Fetch the latest API schemas:

```
npm run swagger:generate-schema:acc
```

## Running

Just using the acceptance backend:

```
npm start
````

To use a local backend, clone the [backend repository](https://github.com/Amsterdam/fixxx-looplijsten-backend) and run
the Docker instances. Load data from BWV which can be gotten from Datapunt – consult the backend readme for more info.

```
npm start:local
````

## Deploying

The `master` branch is automatically deployed to [acceptance](https://acc.top.amsterdam.nl/).

Tag any branch, but preferably master, with a tag like `v1.0.0` to deploy that specific commit
to [production](https://top.amsterdam.nl/).

## About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
