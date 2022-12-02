import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { IData } from '../../models/IData'
import { fetchSiteHTML } from '../../utils/api'
import { toast } from '../../utils/generalFunctions'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { ActionType } from '../redux/actionTypes'
import { AppData } from '../redux/AppData'
import './subscriptionsTab.css'

export default function SubscriptionTab() {
  let dispatch = useDispatch()
  let appKey = useSelector((state: AppData) => state.appKey)
  let subscriptionsData: IData[] = useSelector(
    (state: AppData) => state.subscriptionsData
  )
  let siteHref = useSelector((state: AppData) => state.siteHref)
  let buttons: IButton[] = useSelector(
    (state: AppData) => state.subscriptionsButtons
  )
  let codeToCopy: string = useSelector(
    (state: AppData) => state.subscriptionsCodeToCopy
  )

  let setSubscriptionData = () => {
    if (appKey) {
      fetchSiteHTML(siteHref)
        .then((data) => {
          dispatch({
            type: ActionType.SetSubscriptionData,
            payload: { data: data, appKey: appKey },
          })
        })
        .catch(
          (error: any) => 
          toast('danger', error) 
        )
    }
  }

  useEffect(() => {
    setSubscriptionData()
  }, [appKey])

  return (
    <div className="subscriptions yotpo-text-large yotpo-text-primary">
      <div className="data">
        <DataList data={subscriptionsData} />
      </div>
      <Buttons
        buttons={buttons}
        codeToCopy={codeToCopy}
        redirectUri={'https://subscriptions.yotpo.com/'}
      ></Buttons>
    </div>
  )
}
