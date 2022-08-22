import {
  YotpoDirection,
  YotpoInputType,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ActionType } from '../Redux/actionTypes'
import { AppData } from '../Redux/AppData'
import { YotpoIcon } from '@yotpo-common/react-b2b-components/icon'
import './searchableComponent.css'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'

export default function SearchableComponenet(props: { data: any }) {
  let appKey = useSelector((state: AppData) => state.appKey)
  let productId = useSelector((state: AppData) => state.productId)
  let guid = useSelector((state: AppData) => state.guid)

  const [toggle, setToggle] = useState(false)
  let dispatch = useDispatch()
  function toggleInput() {
    setToggle((current) => !current)
  }

  function handleChange(dataId: string, event: any) {
    if (!event.target.value) {
      return
    }

      dispatch({
        type: ActionType.UpdateDataManually,
        payload: {
          field: dataId,
          newValue: event.target.value,
        },
      })
  }

  return (
    <>
      {!toggle ? (
        <>
          <span className="yotpo-text-large yotpo-text-primary yotpo-text-bold entry-data">
            {props.data.id === 'guid' && !guid
              ? 'No GUID Here'
              : props.data.id === 'appKey' && !appKey
              ? 'No App Key Here'
              : props.data.id === 'productId' && !productId
              ? 'No Product ID Here'
              : props.data.value}
          </span>

          <YotpoTooltip text="Edit" tooltipPlacement={YotpoDirection.top}>
            <YotpoIcon name="edit" onClick={() => toggleInput()}></YotpoIcon>
          </YotpoTooltip>
        </>
      ) : (
        <>
          <YotpoInput
            className="searchable-input"
            type={YotpoInputType.text}
            clearable={true}
            placeholder={props.data.value}
            onYotpoChange={(event) => handleChange(props.data.id, event)}
            onKeyPress={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                toggleInput()
              }
            }}
          />
        </>
      )}
    </>
  )
}
