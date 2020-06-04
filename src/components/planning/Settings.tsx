import React, { FC } from "react"
import { Form } from "react-final-form"
import { breakpoint, Button, themeColor, themeSpacing } from "@datapunt/asc-ui"
import {
  TextField,
  CheckboxFields,
  isRequired,
  NumberField,
  isAboveOtherField, isBelowOtherField
} from "amsterdam-react-final-form"
import styled from "styled-components"
import JSONDisplay from "./JSONDisplay"
import DayPartSettings from "./DayPartSettings"
import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import ErrorMessage from "../global/ErrorMessage"
import SuccessMessage from "../global/SuccessMessage"
import SmallSpinner from "../global/SmallSpinner"
import Box from "../atoms/Box/Box"
import { arrayToObject } from "../../lib/arrayToObject"
import { Day, DayPart } from "../../lib/utils/day"

const Wrap = styled.div`
  margin-bottom: 100px;
`

const ColumnWrap = styled.div`
  margin-bottom: ${ themeSpacing(9) };

  columns: 1;

  @media screen and ${ breakpoint("min-width", "tabletS") } {
    columns: 2;
  }

  @media screen and ${ breakpoint("min-width", "tabletM") } {
    columns: 3;
  }

  @media screen and ${ breakpoint("min-width", "laptopL") } {
    columns: 5;
  }
`

const DayPartSettingsWrap = styled.div`
  display: inline-block;

  vertical-align: top;

  padding-right: 20px;

  &:last-of-type {
    padding-right: 0px;
  }

  width: 100%; // one column

  @media screen and ${ breakpoint("min-width", "tabletS") } {
    width: 50%;   // Two columns
  }

  @media screen and ${ breakpoint("min-width", "tabletM") } {
    width: 33%;   // Three columns
  }

  @media screen and ${ breakpoint("min-width", "laptopL") } {
    width: 20%;   // Five columns
  }
`

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 85px;
  border-top: 1px solid ${ themeColor("tint", "level5") };
`

export type DayPartConfig = {
  day: Day
  dayPart: DayPart
  title: string
}

const DAY_PARTS: DayPartConfig[] = [
  { day: "monday", dayPart: "day", title: "Maandag dag" },
  { day: "tuesday", dayPart: "day", title: "Dinsdag dag" },
  { day: "wednesday", dayPart: "day", title: "Woensdag dag" },
  { day: "thursday", dayPart: "day", title: "Donderdag dag" },
  { day: "friday", dayPart: "day", title: "Vrijdag dag" }
]

const WEEKEND: DayPartConfig[] = [
  { day: "saturday", dayPart: "day", title: "Zaterdag weekend" },
  { day: "sunday", dayPart: "day", title: "Zondag weekend" }
]

const EVENINGS: DayPartConfig[] = [
  { day: "monday", dayPart: "evening", title: "Maandag avond" },
  { day: "tuesday", dayPart: "evening", title: "Dinsdag avond" },
  { day: "wednesday", dayPart: "evening", title: "Woensdag avond" },
  { day: "thursday", dayPart: "evening", title: "Donderdag avond" },
  { day: "friday", dayPart: "evening", title: "Vrijdag avond" }
]

const Settings: FC = () => {
  const {
    projects: {
      data: projects
    },
    stadia: {
      data: stadia
    },
    settings: {
      isFetching,
      isUpdating,
      data: settings,
      errorMessage
    }
  } = useGlobalState()

  const {
    settingsActions: {
      update
    }
  } = useGlobalActions()

  if (projects === undefined || stadia === undefined || settings === undefined) return null

  return <Form
      onSubmit={update}
      initialValues={settings}
      render={({ handleSubmit, values, hasValidationErrors, submitSucceeded, dirty }) => (
         <Wrap>
           <form onSubmit={handleSubmit}>
             <Box pb={9} width={{ laptop: 4 }}>
               <TextField
                 label='Peildatum'
                 name='opening_date'
                 type='date'
                 validate={isRequired()}
               />
               <NumberField
                 label='Postcode van'
                 name="postal_code.range_start"
                 min={1000}
                 max={1109}
                 validate={isBelowOtherField("postal_code.range_end", "De waarde moet lager zijn dan \"Postcode tot\"")}
               />
               <NumberField
                 label='Postcode tot'
                 name='postal_code.range_end'
                 min={1000}
                 max={1109}
                 validate={isAboveOtherField("postal_code.range_start", "De waarde moet hoger zijn dan \"Postcode van\"")}
               />
             </Box>
             <ColumnWrap>
               <CheckboxFields
                 name="projects"
                 options={arrayToObject(projects ?? [])}
                 validate={isRequired()}
               />
             </ColumnWrap>
             { [DAY_PARTS, WEEKEND, EVENINGS].map((row, index) => (
               <Box pb={9} key={index}>
                 { row.map((dayPartConfig) => (
                   <DayPartSettingsWrap key={dayPartConfig.title}>
                     <DayPartSettings stadia={stadia ?? []} {...dayPartConfig} />
                   </DayPartSettingsWrap>
                 ))}
               </Box>
             )) }
             <FixedBox hAlign='flex-end' vAlign='center' p={4} bgColor='level1'>
               { errorMessage && <ErrorMessage text={ errorMessage! } /> }
               { submitSucceeded && !dirty && !isUpdating && !errorMessage && <SuccessMessage text='Succesvol opgeslagen' /> }
               { isUpdating && <SmallSpinner />}
               <Box pl={3} width='auto'>
                 <Button variant="secondary" disabled={isUpdating || hasValidationErrors}>Bewaren</Button>
               </Box>
             </FixedBox>
           </form>
           <JSONDisplay json={ values } />
         </Wrap>)
      } />
}

export default Settings
