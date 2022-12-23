import React, { useEffect, useState } from 'react'
import './optionsLayout.css'
import '@yotpo-common/react-b2b-components/themes/theme.css'
import {
  YotpoGridMargins,
  YotpoLogoColor,
  YotpoSpacing,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import { YotpoLogo } from '@yotpo-common/react-b2b-components/logo'
import { YotpoDivider } from '@yotpo-common/react-b2b-components/divider'
import { useDispatch, useSelector } from 'react-redux'
import { OptionsActionType } from '../Redux/optionsActionTypes'
import {
  getStoredOptions,
  setStoredOptions,
  SyncStorageOptions,
} from '../../../utils/storage'
import ReorderTabs from '../ReorderTabs/ReorderTabs'
import ChooseJS from '../chooseJs/chooseJs'
import OptionsInstructions from '../optionsInstructions/optionsInstructions'
import {
  YotpoGridContainer,
  YotpoGridRow,
  YotpoGridItem,
} from '@yotpo-common/react-b2b-components/grid'
import { toast } from '../../../utils/generalFunctions'
import ChooseDarkMode from '../chooseDarkMode/chooseDarkMode'
import { OptionsAppData } from '../Redux/OptionsAppData'

export default function OptionsLayout() {
  const dispatch = useDispatch()
  let [options, setOptions] = useState<SyncStorageOptions | null>(null)
  let darkMode: boolean = useSelector((state: OptionsAppData) => state.darkMode)

  let handleSaveButtonClick = () => {
    try {
      dispatch({
        type: OptionsActionType.SetStoredOptions,
        payload: options,
      })

      setStoredOptions(options).then(() => {
        toast('success', 'Saved')
      })
    } catch (error) {
      toast('danger', error)
    }
  }

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      if (storedOptions) {
        dispatch({
          type: OptionsActionType.SetStoredOptions,
          payload: storedOptions,
        })
        setOptions(storedOptions)
      } else {
        return
      }
    })
  }, [darkMode])

  if (!options) {
    return null
  }

  // if(darkMode){
  //   document.body.className = 'yotpo-theme-dark-bg'
  // }

  return (
    <YotpoGridContainer pageGrid margins={YotpoGridMargins.page}>
      <YotpoGridRow>
        <YotpoGridItem columns={12}>
          <div
            className={'yotpo-theme-light'}
            // className={
            //   darkMode ? 'yotpo-theme-dark' : 'yotpo-theme-light'
            // }
          >
            <h1>
              Yotpo Backoffice Extension Options
              <OptionsInstructions />
            </h1>
            <YotpoLogo logoColor={YotpoLogoColor.blue}></YotpoLogo>
            <YotpoDivider spacing={YotpoSpacing.medium}></YotpoDivider>
            <ReorderTabs tabs={options.tabs} />
            <YotpoDivider spacing={YotpoSpacing.medium}></YotpoDivider>
            <ChooseJS />
            <YotpoDivider spacing={YotpoSpacing.medium}></YotpoDivider>
            {/* <ChooseDarkMode />
            <YotpoDivider spacing={YotpoSpacing.medium}></YotpoDivider> */}
            <YotpoButton
              className="options-save-button"
              onClick={() => handleSaveButtonClick()}
            >
              Save
            </YotpoButton>
          </div>
        </YotpoGridItem>
      </YotpoGridRow>
    </YotpoGridContainer>
  )
}
