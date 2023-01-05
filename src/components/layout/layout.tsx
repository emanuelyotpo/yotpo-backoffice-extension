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
import NotLoggedIn from '../notLoggedIn/notLoggedIn'
import Tabs from '../tabs/tabs'

export default function Layout() {
  let dispatch = useDispatch()
  let darkMode: boolean = useSelector((state: AppData) => state.darkMode)
  let isLoggedInUserAYotpoAddress: boolean = useSelector(
    (state: AppData) => state.isLoggedInUserAYotpoAddress
  )

  chrome.identity.getProfileUserInfo((userInfo) => {
    dispatch({ type: ActionType.SetLoggedInUer, payload: userInfo })
  })

  useEffect(() => {}, [darkMode, isLoggedInUserAYotpoAddress])

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
      {isLoggedInUserAYotpoAddress ? <Tabs /> : <NotLoggedIn />}
    </div>
  )
}
