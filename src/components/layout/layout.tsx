import React, { Key, useEffect } from 'react'
import './layout.css'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from '../redux/actionTypes'
import { AppData } from '../redux/AppData'
import { ITabData } from '../../models/ITabData'
import { getStoredOptions } from '../../utils/storage'
import { YotpoTabGroup } from '@yotpo-common/react-b2b-components/tab-group'
import { YotpoTabPanel } from '@yotpo-common/react-b2b-components/tab-panel'
import { YotpoTab } from '@yotpo-common/react-b2b-components/tab'
import '@yotpo-common/react-b2b-components/themes/theme.css'

export default function Layout() {
  let dispatch = useDispatch()
  let tabs: ITabData[] = useSelector((state: AppData) => state.tabs)
  let darkMode: boolean = useSelector((state: AppData) => state.darkMode)

  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs[0].title !== 'New Tab') {
      chrome.runtime.sendMessage({ init: 'go' }, async (response: any) => {
        if (response) {
          dispatch({
            type: ActionType.SetInitialData,
            payload: response,
          })
        }
      })
    }
  })

  useEffect(() => {
    getStoredOptions().then((options) => {
      if (options) {
        dispatch({ type: ActionType.SetStoredOptions, payload: options })
      } else {
        return
      }
    })
  }, [darkMode])

  // if(darkMode){
  //   document.body.className = 'yotpo-theme-dark-bg'
  // }

  return (
    <div
    className={'yotpo-theme-light layout'}
      // className={
      //   darkMode ? 'yotpo-theme-dark layout' : 'yotpo-theme-light layout'
      // }
    >
      <YotpoTabGroup>
        {tabs.map((tabInfo, index: Key | null | undefined) => (
          <YotpoTab
            key={index}
            label={tabInfo.label}
            slot="tab"
            selected={index === 0 ? true : false}
          ></YotpoTab>
        ))}

        {tabs.map((tabInfo, index: Key | null | undefined) => (
          <YotpoTabPanel key={index} tab={tabInfo.label}>
            {tabInfo.tab}
          </YotpoTabPanel>
        ))}
      </YotpoTabGroup>
    </div>
  )
}
