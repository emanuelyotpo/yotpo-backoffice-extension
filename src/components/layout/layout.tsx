import React, { Key, useEffect } from 'react'
import './layout.css'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from '../Redux/actionTypes'
import { AppData } from '../Redux/AppData'
import { ITabData } from '../../models/ITabData'
import { getStoredOptions, setStoredOptions } from '../../utils/storage'
import { YotpoTabGroup } from '@yotpo-common/react-b2b-components/tab-group'
import { YotpoTabPanel } from '@yotpo-common/react-b2b-components/tab-panel'
import { YotpoTab } from '@yotpo-common/react-b2b-components/tab'

export default function Layout() {
  const dispatch = useDispatch()
  const tabs: ITabData[] = useSelector((state: AppData) => state.tabs)

  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs[0].title !== 'New Tab') {
      let urlObj = new URL(tabs[0].url)

      dispatch({
        type: ActionType.SetSiteDomain,
        payload: urlObj,
      })
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
    getStoredOptions().then((options) =>
      dispatch({ type: ActionType.SetStoredOptions, payload: options })
    )
  }, [])

  return (
    <div className="layout yotpo-theme-light">
      <YotpoTabGroup>
        {tabs
          .filter((tabInfo, index) => index === 0)
          .map((tabInfo, index) => (
            <>
              <YotpoTab key={index} label={tabInfo.label} slot="tab" selected>
                <span>{tabInfo.label}</span>
              </YotpoTab>
              {/* <YotpoProductLogo
                productName={tabInfo.product}
                size={YotpoSize.large}
                bgColor={YotpoProductLogoBackGroundColor.white}
                showProductName={false}
              ></YotpoProductLogo> */}
            </>
          ))}
        {tabs
          .filter((tabInfo, index) => index !== 0)
          .map((tabInfo, index) => (
            <>
              <YotpoTab key={index} label={tabInfo.label} slot="tab"></YotpoTab>
              {/* <YotpoProductLogo
                productName={tabInfo.product}
                size={YotpoSize.large}
                bgColor={YotpoProductLogoBackGroundColor.white}
                showProductName={false}
              ></YotpoProductLogo> */}
            </>
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
