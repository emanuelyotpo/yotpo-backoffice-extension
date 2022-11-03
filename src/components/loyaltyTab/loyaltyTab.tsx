import React, { Key, useEffect } from 'react'
import './loyaltyTab.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppData } from '../redux/AppData'
import DataList from '../dataList/dataList'
import Buttons from '../buttons/buttons'
import NestedList from '../nestedList/nestedList'
import { IData } from '../../models/IData'
import {
  fetchLoyaltyInstancesData,
  fetchLoyaltyCampaignsData,
  fetchLoyaltyRedemptionsData,
  fetchLoyaltyVipTiersData,
  fetchSiteHTML,
} from '../../utils/api'
import { ActionType } from '../redux/actionTypes'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoStatus } from '@yotpo-common/react-b2b-components/enums'
import { IButton } from '../../models/IButton'

export default function LoyaltyTab() {
  let guid = useSelector((state: AppData) => state.guid)
  let siteHref = useSelector((state: AppData) => state.siteHref)
  let loyaltyData: IData[] = useSelector((state: AppData) => state.loyaltyData)
  let buttons: IButton[] = useSelector((state: AppData) => state.loyaltyButtons)
  let codeToCopy: string = useSelector(
    (state: AppData) => state.loyaltyCodeToCopy
  )
  let instances = useSelector((state: AppData) => state.instances)
  let campaigns = useSelector((state: AppData) => state.campaigns)
  let redemptions = useSelector((state: AppData) => state.redemptions)
  let vipTiers = useSelector((state: AppData) => state.vipTiers)

  let dispatch = useDispatch()

  let setLoyaltyData = () => {
    if (guid) {
      fetchLoyaltyInstancesData(guid)
        .then((data) => {
          dispatch({
            type: ActionType.SetLoyaltyData,
            payload: data,
          })
          fetchLoyaltyCampaignsData(guid).then((data) => {
            dispatch({
              type: ActionType.SetLoyaltyCampaigns,
              payload: data,
            })
          })
          fetchLoyaltyRedemptionsData(guid).then((data) => {
            dispatch({
              type: ActionType.SetLoyaltyRedemptions,
              payload: data,
            })
          })
          fetchLoyaltyVipTiersData(guid).then((data) => {
            dispatch({
              type: ActionType.SetLoyaltyVipTiers,
              payload: data,
            })
          })
          fetchSiteHTML(siteHref).then((data) => {
            dispatch({
              type: ActionType.SetInstalledLoylatyModules,
              payload: data,
            })
          })
        })
        .catch((error: any) =>
          toastAlert(
            {
              alertTitle: `${error}`,
              status: YotpoStatus.danger,
              icon: true,
            },
            () => {}
          )
        )
    }
  }

  useEffect(() => {
    setLoyaltyData()
  }, [guid])

  return (
    <div
      className="tab-content yotpo-text-large yotpo-text-primary"
      id="loyalty"
    >
      <div className="data">
        <DataList data={loyaltyData} />
        {guid && (
          <>
            {instances['null'] && (
              <NestedList data={instances['null']} listTitle="Instances" />
            )}
            {campaigns && <NestedList data={campaigns} listTitle="Campaigns" />}
            {redemptions && (
              <NestedList data={redemptions} listTitle="Redemptions" />
            )}
            {vipTiers && <NestedList data={vipTiers} listTitle="VIP Tiers" />}
          </>
        )}
      </div>
      <Buttons buttons={buttons} codeToCopy={codeToCopy} redirectUri={'https://loyalty-app.yotpo.com/'}></Buttons>
    </div>
  )
}
