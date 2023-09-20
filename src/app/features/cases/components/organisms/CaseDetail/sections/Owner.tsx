import React, { FC } from "react"
import styled from "styled-components"
import { BrkData, BrkDataError, Case } from "app/features/types"

const Ul = styled.ul`
	list-style-position: inside;
	padding-left: 0;
`

type Props = {
  caseData: Case
}

const Owner: FC<Props> = ({ caseData: { brk_data } }) => {
	const hasBrkError = (brk_data as BrkDataError).error
	// An error has occurred!
	if (hasBrkError) {
		return <>BRK-gegevens kunnen momenteel niet worden opgehaald.</>
	}

	const brkData = brk_data as BrkData

	if (brkData.results.length) {
		const rechten = brkData.results.map(result => (
			<span key={ result.id }>
				{ result?.cultuurcode_bebouwd?.omschrijving && (
					<b>{ result?.cultuurcode_bebouwd?.omschrijving }</b>
				)}
				<Ul>{ result?.rechten?.map(recht => <li key={ recht.id } >{ recht._display }</li>) }</Ul>
			</span>
		))
		return (
			<span className="anonymous">
					{ rechten }
			</span>
		)
	}
	// BRK is empty and that shouldn't be possible.
	return <>Er zijn geen BRK-gegevens gevonden.</>
}

export default Owner
