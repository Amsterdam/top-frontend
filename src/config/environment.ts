const { hostname, host } = window.location
export const isProduction = hostname === "top.amsterdam.nl"
export const isAcc = hostname === "acc.top.amsterdam.nl"
export const isDevelopment = hostname === "localhost"
export const forceAcc = host === "localhost:3001"
export const isLocal = isDevelopment && !forceAcc
