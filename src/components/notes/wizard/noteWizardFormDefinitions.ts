import { Fields } from "../../form/Scaffold"
import { FormPositioner } from "amsterdam-scaffold-form/package"

export const stepOne = () => {
  const fields: Fields = {
    time: {
      type: "TextField",
      props: {
        name: "time",
        label: "Starttijd onderzoek",
        type: "time"
      }
    },
    situation: {
      type: "RadioFields",
      props: {
        name: "situation",
        label: "Welke situatie is van toepassing?",
        options: {
          nobodyPresent: "Niemand aanwezig",
          noCooperation: "Geen medewerking",
          accessGranted: "Toegang verleend"
        }
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Volgende"
      }
    }
  }

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

export const notableThings = (situation: string) => {
  const fields: Fields = ({
    notableThings: {
      type: "CheckboxFields",
      props: {
        name: "notableThings",
        label: "Opvallende zaken",
        hint: `${ situation }. Zijn er zaken die verder opvielen?`,
        options: {
          bellDoesNotWork: "Bel functioneert niet",
          contactViaIntercom: "Contact via videobel",
          furnishedInHotelStyle: "Hotelmatig ingericht",
          vacancy: "Leegstand",
          presumablyInhabited: "Vermoedelijk bewoond"
        }
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Volgende"
      }
    }
  })

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

export const suggestion = (situation: string) => {
  const fields: Fields = ({
    suggestion: {
      type: "RadioFields",
      props: {
        name: "suggestion",
        label: "Suggestie nieuw bezoek",
        hint: `${ situation }. Heb je een suggestie wanneer dit adres het beste opnieuw bezocht kan worden?`,
        // TODO columnCount for radioFields
        // columnCount: 2,
        options: {
          weekend: "Weekend",
          daytime: "Overdag",
          nighttime: "'s Avonds",
          unknown: "Onbekend"
        }
      }
    },
    explanation: {
      type: "TextAreaField",
      props: {
        label: "Eventuele toelichting",
        hint: "Bijv. Buurvrouw (6F) gaf aan in het weekend vaak bezoekers te zien",
        name: "explanation"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Volgende"
      }
    }
  })

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}


export const nextVisit = () => {
  const fields: Fields = {
    nextVisit: {
      type: "RadioFields",
      props: {
        name: "nextVisit",
        label: "Kan het volgende onderzoek gewoon plaatsvinden?",
        options: {
          no: "Nee",
          yes: "Ja"
        }
      }
    },
    choiceNo: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { nextVisit } }) => nextVisit === "no",
        field: {
          type: "TextAreaField",
          props: {
            name: "choiceNo",
            label: "Volgende stap",
            hint: "Wat is er nog nodig voordat de volgende stap genomen kan worden?"
          }
        }
      }
    },
    choiceYes: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { nextVisit } }) => nextVisit === "yes",
        field: {
          type: "TextAreaField",
          props: {
            name: "choiceYes",
            label: "Aanvullende informatie",
            hint: "Heb je nog aanvullende informatie voor de volgende stap?"
          }
        }
      }
    },
    submit: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { nextVisit } }) => nextVisit !== undefined,
        field: {
          type: "SubmitButton",
          props: {
            label: "Bewaar",
            align: "right"
          }
        }
      }
    }
  }

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

export const accessGranted = () => {
  const fields: Fields = {
    notes: {
      type: "TextAreaField",
      props: {
        label: "Maak hier je notities om later te verwerken",
        name: "notes"
      }
    },
    fraud: {
      type: "RadioFields",
      props: {
        name: "fraud",
        label: "Heb je n.a.v. het bezoek het vermoeden van woonfraude?",
        options: {
          yes: "Yes",
          no: "No"
        }
      }
    }
  }

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

