import React, { Key } from 'react'
import './loyaltyTab.css'
import { useSelector } from 'react-redux'
import { AppData } from '../Redux/AppData'
import DataList from '../dataList/dataList'
import Buttons from '../buttons/buttons'
import NestedList from '../nestedList/nestedList'
import useCopy from '../useCopy/useCopy'
import { IData } from '../../models/IData'
import copyToClipboard from 'copy-to-clipboard'
import { IButton } from '../../models/IButton'

let LoyaltyTab: React.FC<{
  children?: React.ReactNode
  onDelete?: () => void
}> = () => {
  let guid = useSelector((state: AppData) => state.guid)
  let loyaltyData: IData[] = useSelector((state: AppData) => state.loyaltyData)
  
  let activeInstances = useSelector((state: AppData) => state.activeInstances)
  let inactiveInstances = useSelector(
    (state: AppData) => state.inactiveInstances
  )
  let activeCampaigns = useSelector((state: AppData) => state.activeCampaigns)
  let inactiveCampaigns = useSelector(
    (state: AppData) => state.inactiveCampaigns
  )
  let redemptions = useSelector((state: AppData) => state.redemptions)
  let vipTiers = useSelector((state: AppData) => state.vipTiers)

  return (
    <div className="loyalty" id="loyalty-tab">
      <div className='data'>
      <DataList data={loyaltyData} />
      <NestedList data={activeInstances} listTitle="Active Instances" />
      <NestedList data={inactiveInstances} listTitle="Inactive Instances" />
      <NestedList data={activeCampaigns} listTitle="Active Campaigns" />
      <NestedList data={inactiveCampaigns} listTitle="Inactive Campaigns" />
      <NestedList data={redemptions} listTitle="Redemptions" />
      <NestedList data={vipTiers} listTitle="VIP Tiers" />
      </div>
      <Buttons buttons={'loyalty'}></Buttons>
    </div>
  )
}

export default LoyaltyTab
