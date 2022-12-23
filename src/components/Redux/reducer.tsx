import React from 'react'
import { ICustomQuestion } from '../../models/ICustomQuestion'
import { IJS } from '../../models/IJs'
import { ITabData } from '../../models/ITabData'
import {
  campaignsForList,
  instancesForList,
  orderChildInstances,
  redemptionsForList,
  vipTiersForList,
} from '../../utils/loyaltyFunctions'
import ChildrenInstancesModal from '../childrenInstancesModal/childrenInstancesModal'
import { Action } from './action'
import { ActionType } from './actionTypes'
import { AppData } from './AppData'

export function reduce(
  oldAppData: AppData = new AppData(),
  action: Action
): AppData {
  const newAppData = { ...oldAppData }

  switch (action.type) {
    case ActionType.SetStoredOptions:
      newAppData.options = { ...newAppData.options }
      newAppData.options.js = action.payload.js
      newAppData.js = action.payload.js
      newAppData.js.forEach((jsEnv: IJS) => {
        if (jsEnv.isDefault) {
          newAppData.defaultJs = jsEnv.url
        }
      })
      newAppData.options.js.forEach((jsEnv: IJS) => {
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
      newAppData.options.tabs.forEach((tabA: ITabData) => {
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
      newAppData.options.tabs = optionsTabs
      newAppData.options.accounts = [...newAppData.options.accounts]
      newAppData.options.accounts = action.payload.accounts
      newAppData.accounts = [...newAppData.accounts]
      newAppData.accounts = action.payload.accounts
      newAppData.options.darkMode = action.payload.darkMode
      newAppData.darkMode = action.payload.darkMode
      break

    case ActionType.SetInitialData:
      newAppData.siteDomain = action.payload.siteDomain
      newAppData.siteHref = action.payload.siteHref
      newAppData.appKey = action.payload.appKey
      newAppData.guid = action.payload.guid
      newAppData.productId = action.payload.productId
      newAppData.guid = action.payload.guid
      newAppData.customerEmail = action.payload.customerEmail
      newAppData.customerId = action.payload.customerId
      newAppData.customerTags = action.payload.customerTags
      newAppData.vmsProductId = action.payload.vmsProductId

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

      newAppData.vmsData = [...newAppData.vmsData]
      for (let entry in action.payload) {
        newAppData.vmsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              entry === 'customGalleryIds'
                ? (data.value = action.payload[entry].toString())
                : (data.value = action.payload[entry])
            }
          }
        )
      }

      newAppData.smsData = [...newAppData.smsData]
      for (let entry in action.payload) {
        newAppData.smsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }

      newAppData.subscriptionsData = [...newAppData.subscriptionsData]
      for (let entry in action.payload) {
        newAppData.subscriptionsData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === entry) {
              data.value = action.payload[entry]
            }
          }
        )
      }

      newAppData.reviewsCodeToCopy = `<script type="text/javascript" src="//staticw2.yotpo.com/${action.payload.appKey}/widget.js" async></script>
          <div class="yotpo bottomLine"
              data-product-id="${action.payload.productId}">
          </div>	
          <div class="yotpo yotpo-main-widget"
              data-product-id="${action.payload.productId}">
          </div>`

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
      newAppData.vmsCodeToCopy = `
         <script type="text/javascript" src="//staticw2.yotpo.com/${action.payload.appKey}/widget.js">
         </script>
         <!-- Product Gallery -->
         <div class="yotpo yotpo-pictures-widget"
          data-gallery-id="${action.payload.productGalleryId}"
          data-product-id="${action.payload.vmsProductId}">
         </div>
   
         <!-- Custom Galleries -->
         `
      if (action.payload.customGalleryIds) {
        action.payload.customGalleryIds.forEach((galleryId: any) => {
          newAppData.vmsCodeToCopy = newAppData.vmsCodeToCopy.concat(
            '\n' +
              `<div class="yotpo yotpo-pictures-widget"
                   data-gallery-id="${galleryId}">
                 </div>` +
              '\n'
          )
        })
      }

      newAppData.smsCodeToCopy = `
         <div>
           <script src="https://forms.smsbump.com/${action.payload.userId}/form_${action.payload.formId}.js"></script>
         </div>
         `

      newAppData.subscriptionsCodeToCopy = `
      <script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/${action.payload.appKey}" async></script>
      <div class="yotpo-widget-instance"
          data-yotpo-instance-id="instanceID"
          product-handle="{{product.handle}}"
          widget-type="SubscriptionsAddToCartWidget"
          full-format-product-price="{{ product.price | money }}">
        </div>

      <div class="yotpo-widget-instance"
          data-yotpo-instance-id="instanceID"
          widget-type="SubscriptionsCustomerPortal">
        </div>
         `

      break

    case ActionType.SetReviewsData:
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

      let customFieldsData: Array<ICustomQuestion> = []
      let slugs: Array<string> = Object.keys(
        action.payload.customFieldsAggregation
      )

      if (slugs.length > 0) {
        let values: Array<ICustomQuestion> = Object.values(
          action.payload.customFieldsAggregation
        )

        for (let i = 0; i < slugs.length; i++) {
          values[i].slug = slugs[i]
          customFieldsData.push(values[i])
        }
        newAppData.customFieldsAggregation = customFieldsData
      }
      break

    case ActionType.setReviewsCountsAndData:
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
      let instances = []

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

      for (let instance of action.payload.instances) {
        if (instance.static_content.companyName) {
          newAppData.companyName = instance.static_content.companyName
        }
        if (instance.static_content.merchantId) {
          newAppData.loyaltyData.map((entry) => {
            if (entry.id === 'merchantId') {
              entry.value = instance.static_content.merchantId
            }
          })
          newAppData.merchantId = instance.static_content.merchantId
        }
        instances.push(instance)
      }

      let orderedInstances = orderChildInstances(instances)
      newAppData.instances = []
      newAppData.instances = orderedInstances
      let insatncesKeys = Object.keys(newAppData.instances)
      insatncesKeys.forEach((key: any) => {
        newAppData.instances[key] = instancesForList(
          newAppData.guid,
          newAppData.instances[key]
        )
      })
      newAppData.activeInstancesForCopy = []
      newAppData.instances['null'].forEach((value: any, key: any) => {
        if (value.active) {
          newAppData.activeInstancesForCopy.push({
            id: value.id,
            type: value.type,
          })
        }
      })

      newAppData.loyaltyCodeToCopy = `
      <script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/${newAppData.guid}" async></script>
        <div id="swell-customer-identification"
             data-authenticated="true"
             data-email="${newAppData.customerEmail}"
             data-id="${newAppData.customerId}"
             data-tags="${newAppData.customerTags}"
             style="display:none;">
         </div>
         <div id="yotpo-loyalty-checkout-data"
             cart-subtotal-cents="-----">
         </div>
         <div id="yotpo-loyalty-cart-data">
         </div>

         <!-- Instances -->
         `
      newAppData.activeInstancesForCopy.forEach((instance) => {
        newAppData.loyaltyCodeToCopy = newAppData.loyaltyCodeToCopy.concat(
          '\n' +
            `<!-- ${instance.type} -->
        <div class="yotpo-widget-instance"
            data-yotpo-instance-id="${instance.id}">
        </div>` +
            '\n'
        )
      })

      break

    case ActionType.SetCustomerDetails:
      newAppData.loyaltyData = [...newAppData.loyaltyData]
      for (let entry in action.payload) {
        newAppData.loyaltyData.forEach(
          (data: { key: string; value: any; id: string }) => {
            if (data.id === 'customerEmail') {
              data.value = action.payload['email']
            }
            if (data.id === 'customerId') {
              data.value = action.payload['id']
            }
            if (data.id === 'customerTags') {
              data.value = action.payload['tags']
            }
            if (data.id === 'isCustomerIdentificationInstalled') {
              data.value = 'Auto injection'
            }
          }
        )
      }
      break

    case ActionType.SetLoyaltyCampaigns:
      newAppData.campaigns = action.payload
      newAppData.campaigns = campaignsForList(newAppData.campaigns)
      break

    case ActionType.SetLoyaltyRedemptions:
      newAppData.redemptions = [...newAppData.redemptions]
      newAppData.redemptions = redemptionsForList(action.payload)
      break

    case ActionType.SetLoyaltyVipTiers:
      newAppData.vipTiers = vipTiersForList(action.payload)
      break

    case ActionType.SetInstalledLoylatyModules:
      newAppData.installedInstances = new Set()
      newAppData.instances = { ...newAppData.instances }
      let instancesKeysForInstalledInstancesList = Object.keys(
        newAppData.instances
      )

      let parser = new DOMParser()
      let doc = parser.parseFromString(action.payload, 'text/html')
      let installedInstances = doc.querySelectorAll('.yotpo-widget-instance')
      installedInstances.forEach((instance) => {
        let instanceId = instance.getAttribute('data-yotpo-instance-id')
        newAppData.installedInstances.add(Number(instanceId))
      })
      if (newAppData.installedInstances.size === 0) {
        instancesKeysForInstalledInstancesList.forEach((key: any) => {
          newAppData.instances[key].forEach((instance: any) => {
            instance.installed = false
          })
        })
      } else {
        newAppData.installedInstances.forEach((instanceId) => {
          instancesKeysForInstalledInstancesList.forEach((key: any) => {
            newAppData.instances[key].forEach((instance: any) => {
              instance.id === instanceId
                ? (instance.installed = true)
                : (instance.installed = false)
            })
          })
        })
      }
      newAppData.instances['null'].forEach((value: any) => {
        instancesKeysForInstalledInstancesList.forEach((key: any) => {
          if (parseInt(key) === value.id) {
            newAppData.instances[key].forEach((instance: any) => {
              value.children.push(instance)
            })
          }
        })
        value.children_modules = (
          <ChildrenInstancesModal children={value.children} id={value.id} />
        )
      })
      break

    case ActionType.SetVMSData:
      newAppData.vmsData = [...newAppData.vmsData]
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

    case ActionType.SetSubscriptionData:
      newAppData.subscriptionsData = [...newAppData.subscriptionsData]
      let subscriptionParser = new DOMParser()
      let subscriptionDoc = subscriptionParser.parseFromString(
        action.payload.data,
        'text/html'
      )
      let installedSubscriptionInstances = subscriptionDoc.querySelectorAll(
        '.yotpo-widget-instance'
      )
      newAppData.subscriptionsCodeToCopy = `<script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/${action.payload.appKey}" async></script>`

      installedSubscriptionInstances.forEach((instance) => {
        if (
          instance.getAttribute('widget-type') ===
          'SubscriptionsAddToCartWidget'
        ) {
          newAppData.subscriptionsData.forEach((entry) => {
            if (entry.id === 'subscriptionsProductPageInstanceID') {
              entry.value = instance.getAttribute('data-yotpo-instance-id')
            }
            if (entry.id === 'productHandle') {
              entry.value = instance.getAttribute('product-handle')
            }
          })
          newAppData.subscriptionsCodeToCopy =
            newAppData.subscriptionsCodeToCopy.concat(
              `\n
            <div class="yotpo-widget-instance"
              data-yotpo-instance-id="${instance.getAttribute(
                'data-yotpo-instance-id'
              )}"
              product-handle="${instance.getAttribute('product-handle')}"
              allow-out-of-form="true"
              widget-type="SubscriptionsAddToCartWidget"
              full-format-product-price="{{ product.price | money }}">
            </div>
          \n`
            )
        }
        if (
          instance.getAttribute('widget-type') === 'SubscriptionsCustomerPortal'
        ) {
          newAppData.subscriptionsData.forEach((entry) => {
            if (entry.id === 'subscriptionsMyAccountInstanceID') {
              entry.value = instance.getAttribute('data-yotpo-instance-id')
            }
          })
          newAppData.subscriptionsCodeToCopy =
            newAppData.subscriptionsCodeToCopy.concat(
              `\n
            <div class="yotpo-widget-instance"
              data-yotpo-instance-id="${instance.getAttribute(
                'data-yotpo-instance-id'
              )}"
              widget-type="SubscriptionsCustomerPortal">
            </div>
          \n`
            )
        }
      })
      break

    case ActionType.UpdateDataManually:
      let fieldToUpdate = action.payload.field
      newAppData[fieldToUpdate] = action.payload.newValue

      newAppData.reviewsData = [...newAppData.reviewsData]
      newAppData.reviewsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.loyaltyData = [...newAppData.loyaltyData]
      newAppData.loyaltyData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.vmsData = [...newAppData.vmsData]
      newAppData.vmsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )

      newAppData.smsData = [...newAppData.smsData]
      newAppData.smsData.forEach(
        (data: { key: string; value: any; id: string }) => {
          if (data.id === action.payload.field) {
            data.value = action.payload.newValue
          }
        }
      )
      break

    case ActionType.AddAccountToList:
      newAppData.options = { ...newAppData.options }
      newAppData.options.accounts.push(action.payload)
      break

    case ActionType.RemoveAccountFromList:
      newAppData.options = { ...newAppData.options }
      for (let i = 0; i < newAppData.options.accounts.length; i++) {
        if (newAppData.options.accounts[i].key === action.payload.key) {
          newAppData.options.accounts.splice(i, 1)
        }
      }

      break
  }

  return newAppData
}
