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
  fetchShopifyLoggedInCustomer,
} from '../../utils/api'
import { ActionType } from '../redux/actionTypes'
import { IButton } from '../../models/IButton'
import { toast } from '../../utils/generalFunctions'

export default function LoyaltyTab() {
  let guid = useSelector((state: AppData) => state.guid)
  let siteHref = useSelector((state: AppData) => state.siteHref)
  let siteDomain = useSelector((state: AppData) => state.siteDomain)
  let loyaltyData: IData[] = useSelector((state: AppData) => state.loyaltyData)
  let buttons: IButton[] = useSelector((state: AppData) => state.loyaltyButtons)
  let codeToCopy: string = useSelector(
    (state: AppData) => state.loyaltyCodeToCopy
  )
  let instances = useSelector((state: AppData) => state.instances)
  let campaigns = useSelector((state: AppData) => state.campaigns)
  let redemptions = useSelector((state: AppData) => state.redemptions)
  let vipTiers = useSelector((state: AppData) => state.vipTiers)
  let checkPlatform = (obj) =>
    obj.id === 'platformName' && obj.value === 'Shopify'
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

          if (
            loyaltyData.some(checkPlatform) &&
            siteDomain.includes('myshopify')
          ) {
            fetchShopifyLoggedInCustomer(siteDomain).then((data) => {
              dispatch({
                type: ActionType.SetCustomerDetails,
                payload: data,
              })
            })
          }
        })
        .catch((error: any) => toast('danger', error))
    }
  }

  useEffect(() => {
    setLoyaltyData()
  }, [guid])

  return (
    <div className="tab-content yotpo-text-large yotpo-text-primary">
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
      <Buttons
        buttons={buttons}
        codeToCopy={codeToCopy}
        redirectUri={'https://loyalty-app.yotpo.com/'}
      ></Buttons>
    </div>
  )
}
