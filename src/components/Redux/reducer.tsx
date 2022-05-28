import { IJS } from '../../models/IJs'
import { ITabData } from '../../models/ITabData'
import {
  campaignsForList,
  instancesForList,
  redemptionsForList,
  vipTiersForList,
} from '../../utils/loyaltyFunctions'
import { Action } from './action'
import { ActionType } from './actionTypes'
import { AppData } from './AppData'

export function reduce(
  oldAppData: AppData = new AppData(),
  action: Action
): AppData {
  const newAppData = { ...oldAppData }

  switch (action.type) {
    case ActionType.SetUser:
      newAppData.isYotpoUser = action.payload
      break

    case ActionType.SetSiteDomain:
      newAppData.siteDomain = action.payload.host
      break

    case ActionType.SetStoredOptions:
      newAppData.js = action.payload.js
      newAppData.js.forEach((jsEnv: IJS) => {
        if (jsEnv.isDefault) {
          newAppData.defaultJs = jsEnv.url
        }
      })

      let optionsTabs = action.payload.tabs
      newAppData.tabs.forEach((tabA: ITabData) => {
        optionsTabs.forEach((tabB: ITabData) => {
          if (tabA.value === tabB.value) {
            tabB.tab = tabA.tab
          }
        })
      })
      for (let index = 0; index <= optionsTabs.length - 1; index++) {
        optionsTabs[index].i = index
      }
      newAppData.tabs = optionsTabs
      break

    case ActionType.SetInitialReviewsData:
      newAppData.appkey = action.payload.appkey
      newAppData.productId = action.payload.productId
      newAppData.reviewsData = [...newAppData.reviewsData]
      for (let entry in action.payload) {
        newAppData.reviewsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      newAppData.reviewsCodeToCopy = `
      <script type="text/javascript" src="//staticw2.yotpo.com/${action.payload.appkey}/widget.js" async></script>
  
      <div class="yotpo bottomLine"
          data-product-id="${action.payload.productId}">
      </div>	
      <div class="yotpo yotpo-main-widget"
          data-product-id="${action.payload.productId}">
      </div>`
      break

    case ActionType.SetMoreReviewsData:
      newAppData.reviewsData = [...newAppData.reviewsData]
      for (let entry in action.payload) {
        newAppData.reviewsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      break

    case ActionType.SetGroupedAndSyndicatedReviewCount:
      newAppData.reviewsData = [...newAppData.reviewsData]
      for (let entry in action.payload) {
        newAppData.reviewsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      break

    case ActionType.SetLoyaltyData:
      newAppData.guid = action.payload.guid
      newAppData.loyaltyData = [...newAppData.loyaltyData]
      for (let entry in action.payload) {
        newAppData.loyaltyData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      newAppData.loyaltyCodeToCopy = `<script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/${action.payload.guid}" async></script>
        <div id="swell-customer-identification"
             data-authenticated="true"
             data-email="${action.payload.customerEmail}"
             data-id="${action.payload.customerId}"
             data-tags="${action.payload.customerTags}"
             style="display:none;">
         </div>
         <div id="yotpo-loyalty-checkout-data"
             cart-subtotal-cents="-----">
         </div>
         <div id="yotpo-loyalty-cart-data">
         </div>

         <!-- Instances -->
         `
      break

    case ActionType.SetMoreLoyaltyData:
      for (let entry in action.payload.instances[0].static_content) {
        newAppData.loyaltyData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value =
                action.payload.instances[0].static_content[entry]
                  .charAt(0)
                  .toUpperCase() +
                action.payload.instances[0].static_content[entry].slice(1)
            }
          }
        )
      }

      newAppData.activeInstances = []
      newAppData.inactiveInstances = []

      for (let instance of action.payload.instances) {
        if (instance.static_content.companyName) {
          newAppData.companyName = instance.static_content.companyName
        }
        if (instance.active && !instance.parent_instance_id) {
          newAppData.activeInstances.push(instance)
        } else if (!instance.active && !instance.parent_instance_id) {
          newAppData.inactiveInstances.push(instance)
        }
      }

      newAppData.activeInstances = instancesForList(newAppData.activeInstances)
      newAppData.inactiveInstances = instancesForList(
        newAppData.inactiveInstances
      )
      newAppData.activeInstancesForCopy = [...newAppData.activeInstancesForCopy]
      newAppData.activeInstances.forEach(function (value, key) {
        newAppData.activeInstancesForCopy.push({
          id: value.widget_instance_id,
          type: value.widget_type_name,
          name: value.instance_name,
        })
      })
      newAppData.activeInstancesForCopy.forEach((instance) => {
        newAppData.loyaltyCodeToCopy = newAppData.loyaltyCodeToCopy.concat(
          '\n' +
            `<!-- ${instance.name + ' (' + instance.type + ')'} -->
        <div class="yotpo-widget-instance"
            data-yotpo-instance-id="${instance.id}">
        </div>` +
            '\n'
        )
      })
      break

    case ActionType.SetLoyaltyCampaigns:
      newAppData.activeCampaigns = []
      newAppData.inactiveCampaigns = []
      for (let campaign of action.payload) {
        if (campaign.active) {
          newAppData.activeCampaigns.push(campaign)
        } else if (!campaign.active) {
          newAppData.inactiveCampaigns.push(campaign)
        }
      }
      newAppData.activeCampaigns = campaignsForList(newAppData.activeCampaigns)
      newAppData.inactiveCampaigns = campaignsForList(
        newAppData.inactiveCampaigns
      )
      break

    case ActionType.SetLoyaltyRedemptions:
      newAppData.redemptions = [...newAppData.redemptions]
      newAppData.redemptions = redemptionsForList(action.payload)
      break

    case ActionType.SetLoyaltyVipTiers:
      newAppData.vipTiers = vipTiersForList(action.payload)
      break

    case ActionType.SetVMSData:
      newAppData.vmsData = [...newAppData.vmsData]
      newAppData.vmsAppkey = action.payload.vmsAppkey
      for (let entry in action.payload) {
        newAppData.vmsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }

      newAppData.vmsCodeToCopy = `
      <script type="text/javascript" src="//staticw2.yotpo.com/${action.payload.vmsAppkey}/widget.js">
      </script>
    <!-- Custom Gallery -->
      <div class="yotpo yotpo-pictures-widget"
        data-gallery-id="${action.payload.galleryId}">
      </div>

    <!-- Product Gallery -->
      <div class="yotpo yotpo-pictures-widget"
      data-gallery-id="${action.payload.galleryId}"
        data-product-id="${action.payload.vmsProductId}">
      </div>
      `
      break

    case ActionType.SetMoreVMSData:
      for (let entry in action.payload) {
        newAppData.vmsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      break

    case ActionType.SetSMSData:
      for (let entry in action.payload) {
        newAppData.smsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }
      newAppData.smsCodeToCopy = `
      <div>
        <script src="https://forms.smsbump.com/${action.payload.userId}/form_${action.payload.formId}.js"></script>
      </div>
      `
      break

    case ActionType.UpdateDataManually:
      let fieldToUpdate = action.payload.field
      newAppData[fieldToUpdate] = action.payload.newValue

      newAppData.reviewsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.loyaltyData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.vmsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.smsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      break
  }
  return newAppData
}
