import React, { FC } from "react"
import styled, { css } from "styled-components"
import { TextField, NumberField, isRequired, isMatchingRegex, combineValidators } from "amsterdam-react-final-form"
import { Button } from "@datapunt/asc-ui"
import { Search, Close } from "@datapunt/asc-assets"
import useGlobalState from "../../hooks/useGlobalState"
import { Form } from "react-final-form"
import Box from "../atoms/Box/Box"
import { mq } from "../atoms/responsive"


const StyledButton = styled(Button)`  
  margin-top: 0;
  
  ${ mq("tabletS", css`
    margin-top: 30px;
  `) }  
`

type FormValues = {
  postalCode: string
  streetNumber: string
  suffix?: string
}

const SearchForm: FC = () => {
  const {
    search: {
      query
    },
    searchActions: {
      search,
      clear: clearGlobalSearchState
    }
  } = useGlobalState()

  const onSubmit = async ({ postalCode, streetNumber, suffix }: FormValues) => search(
      postalCode,
      streetNumber,
      suffix ?? ""
  )

  const [ postalCode, streetNumber, suffix ] = query ?? []

  return (
    <div className="Search">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          postalCode: postalCode ?? "",
          streetNumber: streetNumber ?? "",
          suffix
        }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={ handleSubmit }>
            <Box>
              <Box stretch={true} p={1}>
                <TextField
                  label='Postcode'
                  name="postalCode"
                  autoFocus
                  validate={combineValidators(
                    isRequired(),
                    isMatchingRegex(/\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*/, "Geldige postcodes zijn: 1234AA of 1234 aa")
                  )}
                  tabIndex={1}
                />
              </Box>
              <Box width={{ mobileS: 12, tabletS: 2, desktop: 1 }} p={1}>
                <NumberField
                  label='Huisnr.'
                  name='streetNumber'
                  min="1"
                  step="1"
                  pattern="\d+"
                  title="Alleen cijfers zijn geldig"
                  hideNumberSpinner={true}
                  validate={isRequired()}
                  tabIndex={2}
                />
              </Box>
              <Box width={{ mobileS: 12, tabletS: 2, desktop: 1 }} p={1}>
                <TextField
                  label='Hslt.&nbsp;/&nbsp;etage'
                  name="suffix"
                  tabIndex={3}
                />
              </Box>
              <Box width={{ mobileS: 6, tabletS: "auto" }} p={1} pt={4}>
                <StyledButton
                  variant="tertiary"
                  iconSize={ 20 }
                  icon={ <Close /> }
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    form.reset()
                    clearGlobalSearchState()
                  }}
                />
              </Box>
              <Box width={{ mobileS: 6, tabletS: "auto" }} p={1} pt={4} hAlign="flex-end">
                <StyledButton
                  variant="secondary"
                  iconSize={ 20 }
                  icon={ <Search /> }
                  tabIndex={4}
                />
              </Box>
            </Box>
          </form>
        )}
      />
    </div>
  )
}

export default SearchForm
