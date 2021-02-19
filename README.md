# TOP app (Toezicht op pad)

Dankzij de TOP app hebben toezichthouders Wonen veel informatie over zaken, adressen en bewoners bij de hand als zij op straat
hun werk doen. Ook kunnen zij hun eigen looplijst samenstellen, op basis van instellingen die planners hebben
klaargezet.

## Getting started

1. `git clone https://github.com/Amsterdam/fixxx-looplijsten-frontend.git`
1. `cd fixxx-looplijsten-frontend`
1. `npm install .`
1. `npm run swagger:generate-schema:acc` to fetch the latest API-schemas
1. `npm start`

## Development

### Using the acceptance backend

To connect your locally run frontend to the acceptance backend:

1. Create a new file `.env.development.local`. Git will ignore it.
1. Add `REACT_APP_GATEWAY=https://acc.api.top.amsterdam.nl/api/v1/` to it.

See [.env.development](https://github.com/Amsterdam/fixxx-looplijsten-frontend/blob/master/.env.development) for
examples.

### Using a local backend

Download the [looplijsten backend](https://github.com/Amsterdam/fixxx-looplijsten-backend) and run the Docker
instances.<br />
Load data from BWV which can be gotten from Datapunt.<br />
Consult the backend readme for more info.<br />

## Deployment

- The `master` branch is automatically deployed to [acceptance](https://acc.top.amsterdam.nl/).
- Tag any branch, but preferably master, with a tag like `v1.0.0` to deploy that specific commit
  to [production](https://top.amsterdam.nl/).

.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._
