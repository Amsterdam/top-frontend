import React from "react"
import { Button } from "@amsterdam/asc-ui"
import { Checkmark, ChevronLeft } from "@amsterdam/asc-assets"
import { useFormState } from "react-final-form"
import ErrorMessage from "app/features/shared/components/atoms/ErrorMessage/ErrorMessage"
import SuccessMessage from "app/features/shared/components/atoms/SuccessMessage/SuccessMessage"
import SmallSpinner from "app/features/shared/components/atoms/SmallSpinner/SmallSpinner"
import styles from "./FixedSubmitButton.module.css"

type Props = {
  errorMessage?: string
  caseCount?: string
  onClose?: () => void
}

/**
 * Renders a submit button in a fixed-positioned container
 */
const FixedSubmitButton: React.FC<Props> = ({ errorMessage, caseCount, onClose }) => {
  const { submitSucceeded, submitting, hasValidationErrors, dirty, dirtySinceLastSubmit } = useFormState()

  return (
    <div>
      <div className={styles.stickyFooter} >
        { errorMessage && !dirtySinceLastSubmit && <ErrorMessage text={ errorMessage! } /> }
        { submitSucceeded && !submitting && !dirty && !errorMessage && <SuccessMessage text="Succesvol bewaard" /> }
        { submitting && <SmallSpinner /> }
        { caseCount !== undefined && !submitting && !dirty && !errorMessage && (
          <div>{`Met deze instellingen zijn er ${ caseCount } beschikbare bezoeken mogelijk`}</div>
        )}
        <div className={styles.actionButtons}>
          {onClose && (
            <Button type="button" onClick={onClose} variant="tertiary" iconSize={14} iconLeft={<ChevronLeft />}>
              Terug
            </Button>
          )}
          <Button
            variant="secondary"
            disabled={ submitting || hasValidationErrors || !dirty }
            iconLeft={<Checkmark />}
          >
            Bereken en bewaar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FixedSubmitButton
