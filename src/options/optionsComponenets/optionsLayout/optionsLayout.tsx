import React, { useEffect, useState } from 'react'
import './optionsLayout.css'
import '@yotpo-common/react-b2b-components/themes/theme.css'
import {
  YotpoGridMargins,
  YotpoLogoColor,
  YotpoSpacing,
  YotpoStatus,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import { YotpoLogo } from '@yotpo-common/react-b2b-components/logo'
import { YotpoDivider } from '@yotpo-common/react-b2b-components/divider'
import { useDispatch } from 'react-redux'
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
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'

export default function OptionsLayout() {
  const dispatch = useDispatch()
  let [options, setOptions] = useState<SyncStorageOptions | null>(null)

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
  }, [])

  let handleSaveButtonClick = () => {
    try {
      dispatch({
        type: OptionsActionType.SetStoredOptions,
        payload: options,
      })

      setStoredOptions(options).then(() => {
        toastAlert(
          {
            alertTitle: `Saved`,
            status: YotpoStatus.success,
            icon: true,
          },
          () => {}
        )
      })
    } catch (error) {
      toastAlert(
        {
          alertTitle: `${error}`,
          status: YotpoStatus.danger,
          icon: true,
        },
        () => {}
      )
    }
  }

  if (!options) {
    return null
  }

  return (
    <YotpoGridContainer pageGrid margins={YotpoGridMargins.page}>
      <YotpoGridRow>
        <YotpoGridItem columns={12}>
          <div className="options-page yotpo-theme-light">
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
