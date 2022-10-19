import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoStatus } from '@yotpo-common/react-b2b-components/enums'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { IData } from '../../models/IData'
import { fetchSiteHTML } from '../../utils/api'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { ActionType } from '../Redux/actionTypes'
import { AppData } from '../Redux/AppData'
import './subscriptionsTab.css'

export default function SubscriptionTab() {
  let dispatch = useDispatch()
  let appKey = useSelector((state: AppData) => state.appKey)
  let subscriptionData: IData[] = useSelector(
    (state: AppData) => state.subscriptionData
  )
  let siteHref = useSelector((state: AppData) => state.siteHref)
  let buttons: IButton[] = useSelector(
    (state: AppData) => state.subscriptionButtons
  )
  let codeToCopy: string = useSelector(
    (state: AppData) => state.subscriptionCodeToCopy
  )

  let setSubscriptionData = () => {
    if (appKey) {
      fetchSiteHTML(siteHref)
        .then((data) => {
          dispatch({
            type: ActionType.SetMoreSubscriptionData,
            payload: { data: data, appKey: appKey },
          })
        })
        .catch(
          (error: any) => console.log(error)
          // toastAlert(
          //   {
          //     alertTitle: `${error}`,
          //     status: YotpoStatus.warning,
          //     icon: true,
          //   },
          //   () => {}
          // )
        )
    }
  }

  useEffect(() => {
    setSubscriptionData()
  }, [appKey])

  return (
    <div className="subscription yotpo-text-large yotpo-text-primary">
      <div className="data">
        <DataList data={subscriptionData} />
      </div>
      <Buttons
        buttons={buttons}
        codeToCopy={codeToCopy}
        redirectUri={'https://subscriptions.yotpo.com/'}
      ></Buttons>
    </div>
  )
}
