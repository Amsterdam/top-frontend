import React from "react"
import { Dd, Dl, Dt, Li, Ul } from "../../organisms/Days/DaySettingsCardStyles"

type Props = {
  labels: string[]
  options?: any[] | null
  values?: any[] | null
}

const getNameById = (array: any[] | undefined, id: number) => array?.map((item) => (item.id === id) ? item.name : undefined)

const ValueList: React.FC<Props> = (({ labels, options, values }) => {
  if (!options) {
    return null
  }

  return (
    <Dl>
      <Dt>
        { labels.length === 1 ? labels[0] : values?.length === 1 ? labels[0] : labels[1] }
      </Dt>
      <Dd>
        { values?.length ?
          <Ul>
            { values.map((value) => (
              <Li key={ `labels[0]-${ value }` }>{ getNameById(options, value) }</Li>
            )) }
          </Ul>
          : "–" }
      </Dd>
    </Dl>
  )
})

export default ValueList
