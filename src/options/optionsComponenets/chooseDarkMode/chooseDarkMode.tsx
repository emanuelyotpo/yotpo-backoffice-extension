import React from 'react'
import './chooseDarkMode.css'
import { useDispatch, useSelector } from 'react-redux'
import { OptionsActionType } from '../Redux/optionsActionTypes'
import { YotpoSwitch } from '@yotpo-common/react-b2b-components/switch'
import { OptionsAppData } from '../Redux/OptionsAppData'

export default function ChooseDarkMode() {
  const dispatch = useDispatch()
  let darkMode: boolean = useSelector(
    (state: OptionsAppData) => state.options.darkMode
  )

  const handleDarkModeChange = (event: any) => {    
    dispatch({
      type: OptionsActionType.SetDarkMode,
      payload: { value: event.detail },
    })
  }

  return (
    <>
      <h3>Enable Dark Mode</h3>
      <YotpoSwitch
        // checked={darkMode}
        label={darkMode ? 'Enabled' : 'Disabled'}
        onYotpoChange={(event: Event) => handleDarkModeChange(event)}
      ></YotpoSwitch>
    </>
  )
}
