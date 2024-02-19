# Keycloak, React, TypeScript

## Implement

- Add `<script src="https://iam.amsterdam.nl/auth/js/keycloak.js"></script>`
  to [index.html](https://github.com/Amsterdam/zaken-frontend/blob/main/public/index.html)
- Add `KeycloakProvider` to [App.tsx](https://github.com/Amsterdam/zaken-frontend/blob/main/src/App.tsx)
- Optionaly add a `initializedCallback` function
- Use `useKeycloak` hook in your components

## TODO

- Look into SSO (Single Sign On) support
- IE11 bug
