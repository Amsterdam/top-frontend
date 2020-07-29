import { FormPositioner } from "amsterdam-scaffold-form/package"

import { Fields } from "../../../form/Scaffold"
import { OnBackButtonClick } from "../types"

export const stepOne = () => {
  const fields: Fields = {
    time: {
      type: "TextField",
      props: {
        name: "start_time",
        label: "Starttijd onderzoek",
        type: "time",
        isRequired: true
      }
    },
    situation: {
      type: "RadioFields",
      props: {
        isRequired: true,
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

export const notableThings = (handleBack: OnBackButtonClick, situation: string) => {
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
    back: {
      type: "Button",
      props: {
        variant: "tertiary",
        onClick: handleBack,
        label: "Vorige"
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
    .setGrid("mobileS", "1fr 1fr", [
      ["notableThings", "notableThings"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}

export const suggestion = (handleBack: OnBackButtonClick, situation: string) => {
  const fields: Fields = ({
    suggestion: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "suggestion",
        label: "Suggestie nieuw bezoek",
        hint: `${ situation }. Heb je een suggestie wanneer dit adres het beste opnieuw bezocht kan worden?`,
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
    back: {
      type: "Button",
      props: {
        variant: "tertiary",
        onClick: handleBack,
        label: "Vorige"
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
    .setGrid("mobileS", "1fr 1fr", [
      ["suggestion", "suggestion"],
      ["explanation", "explanation"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}


export const nextVisit = (handleBack: OnBackButtonClick) => {
  const fields: Fields = {
    nextVisit: {
      type: "RadioFields",
      props: {
        isRequired: true,
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
            isRequired: true,
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
    back: {
      type: "Button",
      props: {
        variant: "tertiary",
        onClick: handleBack,
        label: "Vorige"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Bewaar",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["nextVisit", "nextVisit"],
      ["choiceNo", "choiceNo"],
      ["choiceYes", "choiceYes"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}

export const accessGranted = (handleBack: OnBackButtonClick) => {
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
          yes: "Ja",
          no: "Nee"
        }
      }
    },
    back: {
      type: "Button",
      props: {
        variant: "tertiary",
        onClick: handleBack,
        label: "Vorige"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Opslaan"
      }
    }
  }

  return new FormPositioner(fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["notes", "notes"],
      ["fraud", "fraud"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}

