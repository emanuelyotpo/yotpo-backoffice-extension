import React from 'react'
import './chooseJs.css'
import { useDispatch, useSelector } from 'react-redux'
import { OptionsActionType } from '../Redux/optionsActionTypes'
import { YotpoDropdown } from '@yotpo-common/react-b2b-components/dropdown'
import { YotpoList } from '@yotpo-common/react-b2b-components/list'
import { YotpoListItem } from '@yotpo-common/react-b2b-components/list-item'
import { IJS } from '../../../models/IJs'
import { AppData } from '../Redux/AppData'

export default function ChooseJS() {
  const dispatch = useDispatch()
  let js: IJS[] = useSelector((state: AppData) => state.options.js)

  const handleJSChange = (event: any) => {
    dispatch({
      type: OptionsActionType.SetJs,
      payload: { value: event.target.value },
    })
  }

  return (
    <>
      <h3>JS Environment</h3>
      <YotpoDropdown
        placeholder="Choose Default JS Environment"
        onYotpoChange={(event: Event) => handleJSChange(event)}
      >
        <YotpoList>
          {js.map((jsEnv, index) => {
            return (
              <>
                <YotpoListItem
                  key={index}
                  label={jsEnv.name}
                  value={jsEnv.value}
                ></YotpoListItem>
              </>
            )
          })}
        </YotpoList>
      </YotpoDropdown>
    </>
  )
}
