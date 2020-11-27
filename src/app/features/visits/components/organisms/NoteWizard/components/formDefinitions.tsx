import React from "react"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import { Fields } from "app/features/shared/components/form/Scaffold"
import HelpButton from "app/features/shared/components/molecules/HelpIcon/HelpButton"

import { OnBackButtonClick } from "../types"

export const stepOne = (handleBack: OnBackButtonClick, situation: string, observationChoices: {}, suggestNextVisitChoices: {}, situationChoices: {}) => {
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
        options: situationChoices || {
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

export const notableThings = (handleBack: OnBackButtonClick, situation: string, observationChoices: {}, suggestNextVisitChoices: {}, situationChoices: {}) => {
  const fields: Fields = ({
    observations: {
      type: "CheckboxFields",
      props: {
        name: "observations",
        label: "Opvallende zaken",
        hint: `${ situation }. Zijn er zaken die verder opvielen? (niet verplicht)`,
        options: observationChoices || {
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
      [ "observations", "observations" ],
      [ "back", "submit" ]
    ])
    .getScaffoldProps()
}

export const suggestion = (handleBack: OnBackButtonClick, situation: string, observationChoices: {}, suggestNextVisitChoices: {}, situationChoices: {}) => {
  const fields: Fields = ({
    suggest_next_visit: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "suggest_next_visit",
        label: "Suggestie nieuw bezoek",
        hint: "Wanneer kan dit adres het beste opnieuw bezocht worden?",
        options: suggestNextVisitChoices || {
          daytime: "Overdag",
          weekend: "Weekend",
          evening: "'s Avonds",
          unknown: "Niet meer uitzetten"
        }
      }
    },
    suggest_next_visit_description: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { suggest_next_visit } }) => suggest_next_visit && suggest_next_visit !== "daytime",
        field: {
          type: "TextAreaField",
          props: {
            isRequired: true,
            label: "Geef toelichting",
            name: "suggest_next_visit_description"
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
        align: "right",
        label: "Volgende"
      }
    }
  })

  return new FormPositioner(fields)
    .setGrid("mobileS", "1fr 1fr", [
      [ "suggest_next_visit", "suggest_next_visit" ],
      [ "suggest_next_visit_description", "suggest_next_visit_description" ],
      [ "back", "submit" ]
    ])
    .getScaffoldProps()
}

export const nextVisit = (handleBack: OnBackButtonClick, situation: string, observationChoices: {}, suggestNextVisitChoices: {}, situationChoices: {}) => {
  const fields: Fields = {
    next_visit: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "can_next_visit_go_ahead",
        label: "Kan het adres direct worden uitgezet?",
        extraLabel: <HelpButton>
          <strong>Tegenhouden of doorlaten?</strong>
          <p>
            Doorlaten (ja): adres komt zonder tussenkomst weer in een looplijst terecht.
          </p>
          <p>
            Tegenhouden (nee): het adres kan niet direct worden uitgezet. <em>Voorbeeld: machtiging vereist.</em>
          </p>
        </HelpButton>,
        options: {
          yes: "Ja, doorlaten",
          no: "Nee, tegenhouden"
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
            isRequired: true,
            name: "can_next_visit_go_ahead_description",
            label: "Waarom niet?"
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
            hint: "Zijn er nog noemenswaardigheden? (niet verplicht)"
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
        label: "Opslaan",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields)
    .setGrid("mobileS", "1fr 1fr", [
      [ "next_visit", "next_visit" ],
      [ "next_visit_no_description", "next_visit_no_description" ],
      [ "next_visit_yes_description", "next_visit_yes_description" ],
      [ "back", "submit" ]
    ])
    .getScaffoldProps()
}

export const accessGranted = (handleBack: OnBackButtonClick, situation: string, observationChoices: {}, suggestNextVisitChoices: {}, situationChoices: {}) => {
  const fields: Fields = {
    notes: {
      type: "TextAreaField",
      props: {
        label: "Maak hier je notities om later te verwerken",
        name: "personal_notes",
        rows: 12,
        extraLabel: <HelpButton>
          <p>Eigen notities ten behoeve van rapportage en debrief. Alleen zichtbaar voor je team.</p>
        </HelpButton>
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte samenvatting voor logboek",
        name: "description",
        extraLabel: <HelpButton>
          <p>Deze korte toelichting van je bezoek is voor iedereen zichtbaar in het logboek van de TOP-app</p>
        </HelpButton>
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
      [ "notes", "notes" ],
      [ "description", "description" ],
      [ "back", "submit" ]
    ])
    .getScaffoldProps()
}
