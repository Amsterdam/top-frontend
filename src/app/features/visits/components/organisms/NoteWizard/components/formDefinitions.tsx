import React from "react"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import { Fields } from "app/features/shared/components/form/Scaffold"
import HelpButton from "app/features/shared/components/molecules/HelpIcon/HelpButton"

import { OnBackButtonClick } from "../types"

export const stepOne = () => {
  const fields: Fields = {
    time: {
      type: "CurrentTime",
      props: {
        name: "start_time",
        label: "Starttijd onderzoek"
      }
    },
    status: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "situation",
        label: "Welke situatie is van toepassing?",
        options: {
          nobody_present: "Niemand aanwezig",
          no_cooperation: "Geen medewerking",
          access_granted: "Toegang verleend"
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
    observations: {
      type: "CheckboxFields",
      props: {
        name: "observations",
        label: "Opvallende zaken",
        hint: `${ situation }. Zijn er zaken die verder opvielen?`,
        options: {
          malfunctioning_doorbell: "Bel functioneert niet",
          intercom: "Contact via intercom",
          hotel_furnished: "Hotelmatig ingericht",
          vacant: "Leegstand",
          likely_inhabited: "Vermoedelijk bewoond"
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
      ["observations", "observations"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}

export const suggestion = (handleBack: OnBackButtonClick, situation: string) => {
  const fields: Fields = ({
    suggest_next_visit: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "suggest_next_visit",
        label: "Suggestie nieuw bezoek",
        hint: `${ situation }. Wanneer kan dit adres het beste opnieuw bezocht worden?`,
        options: {
          weekend: "Weekend",
          daytime: "Overdag",
          evening: "'s Avonds",
          unknown: "Onbekend"
        }
      }
    },
    suggest_next_visit_description: {
      type: "TextAreaField",
      props: {
        label: "Eventuele toelichting",
        hint: "Bijv. Buurvrouw (6F) gaf aan in het weekend vaak bezoekers te zien",
        name: "suggest_next_visit_description"
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
      ["suggest_next_visit", "suggest_next_visit"],
      ["suggest_next_visit_description", "suggest_next_visit_description"],
      ["back", "submit"]
    ])
    .getScaffoldProps()
}


export const nextVisit = (handleBack: OnBackButtonClick) => {
  const fields: Fields = {
    next_visit: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "can_next_visit_go_ahead",
        label: "Kan het adres direct worden uitgezet?",
        extraLabel: <HelpButton>
          <strong>Stop or go?</strong>
          <p>
            <em>Nee</em>: de zaak dient eerst bekeken te worden of actie is vereist voordat het adres opnieuw bezocht wordt. Bijv: machtiging of leegstand.
            Verplicht: toelichting waarom adres niet automatisch in voorraad kan komen.</p>
          <p>
            <em>Ja</em>: het adres kan zonder tussenkomst van een collega direct weer in de looplijstvoorraad opgenomen worden.<br />
            <em>Optioneel: geven relevante tips voor volgend bezoek.</em>
          </p>
        </HelpButton>,
        options: {
          no: "Nee",
          yes: "Ja"
        }
      }
    },
    next_visit_no_description: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { can_next_visit_go_ahead } }) => can_next_visit_go_ahead === "no",
        field: {
          type: "TextAreaField",
          props: {
            name: "can_next_visit_go_ahead_description",
            label: "Volgende stap",
            hint: "Wat is er nog nodig voordat de volgende stap genomen kan worden?"
          }
        }
      }
    },
    next_visit_yes_description: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { can_next_visit_go_ahead } }) => can_next_visit_go_ahead === "yes",
        field: {
          type: "TextAreaField",
          props: {
            name: "can_next_visit_go_ahead_description",
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
      ["next_visit", "next_visit"],
      ["next_visit_no_description", "next_visit_no_description"],
      ["next_visit_yes_description", "next_visit_yes_description"],
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
        name: "personal_notes"
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
      ["back", "submit"]
    ])
    .getScaffoldProps()
}
