import React, { Key } from 'react'
import './loyalty-tab.css'
import { useSelector } from 'react-redux'
import { AppData } from '../Redux/AppData'
import DataList from '../dataList/dataList'
import {
  instancesForList,
} from '../../utils/loyaltyFunctions'
import Buttons from '../buttons/buttons'
import NestedList from '../nestedList/nestedList'

let LoyaltyTab: React.FC<{
  children?: React.ReactNode
  onDelete?: () => void
}> = () => {
  let guid = useSelector((state: AppData) => state.guid)
  let merchantId = useSelector((state: AppData) => state.merchantId)
  let loyaltyPlatforms = useSelector((state: AppData) => state.loyaltyPlatforms)
  let customerEmail = useSelector((state: AppData) => state.customerEmail)
  let customerId = useSelector((state: AppData) => state.customerId)
  let customerTags = useSelector((state: AppData) => state.customerTags)
  let activeInstances = useSelector((state: AppData) => state.activeInstances)
  let instancesForCopy = useSelector((state: AppData) => state.instancesForCopy)
  let inactiveInstances = useSelector(
    (state: AppData) => state.inactiveInstances
  )

  let loyaltyData = [
    { key: 'GUID: ', value: guid, id: 'guid' },
    { key: 'Merchant ID: ', value: merchantId, id: 'merchantId' },
    { key: 'Platform: ', value: loyaltyPlatforms, id: 'platform' },
    { key: 'Customer Email: ', value: customerEmail, id: 'customerEmail' },
    { key: 'Customer ID: ', value: customerId, id: 'customerId' },
    { key: 'Customer Tags: ', value: customerTags, id: 'customerTags' },
  ]

  let activeInstancesList = []
  let inactiveInstancesList = []

  instancesForList(activeInstances, activeInstancesList)
  instancesForList(inactiveInstances, inactiveInstancesList) 

  let loyaltyButtons = [
    {
      description: 'LOADER LINK',
      href: `https://cdn-widgetsrepository.yotpo.com/v1/loader/${guid}`,
      target: '_blank',
      toolTip: 'Loader Link',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: function () {
        navigator.clipboard.writeText(
          `<script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/${guid}" async=""></script>
          
          <div id="swell-customer-identification"
              data-authenticated="true"
              data-email="${customerEmail}"
              data-id="${customerId}"
              data-tags="${customerTags}"
              style="display:none;">
              </div>
      
          <div class="yotpo-widget-instance" data-yotpo-instance-id="-----"></div>
          <div id="yotpo-loyalty-checkout-data" cart-subtotal-cents="-----"></div>
          <div id="yotpo-loyalty-cart-data"></div>
          
          <!-- Instances: -->
          ${instancesForCopy.map((instance: any | null | undefined, index: Key | null | undefined) => instance)}
          `)
      },
      href: 'https://js.do',
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  return (
    <div className="loyalty" id="loyalty-tab">
      <DataList data={loyaltyData} />
      <NestedList data={activeInstancesList} listTitle="Active Instances" />
      <NestedList data={inactiveInstancesList} listTitle="Inactive Instances" />
      <Buttons buttons={loyaltyButtons}></Buttons>
    </div>
  )
}

export default LoyaltyTab
