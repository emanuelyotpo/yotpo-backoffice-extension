import {
  editSingleLoyaltyInstanceStaticContent,
  fetchLoyaltyInstancesData,
  fetchSingleLoyaltyInstanceData,
} from './api'
import { groupBy } from 'lodash'
import React from 'react'
import EditStaticContent from '../components/editStaticContent/editStaticContent'

export function instancesForList(guid: string, instancesArray: any[]) {
  let convertedInstancesArray = []
  instancesArray.forEach((instance: any) => {
    if (instance.parent_instance_id) {
      convertedInstancesArray.push({
        id: instance.widget_instance_id,
        type: instance.widget_type_name,
        active: instance.active,
        static_content: (
          <EditStaticContent
            instance={{
              id: instance.widget_instance_id,
              guid,
            }}
          />
        ),
      })
    } else {
      convertedInstancesArray.push({
        id: instance.widget_instance_id,
        type: instance.widget_type_name,
        active: instance.active,
        children: [],
        static_content: (
          <EditStaticContent
            instance={{
              id: instance.widget_instance_id,
              guid,
            }}
          />
        ),
      })
    }
  })

  instancesArray = convertedInstancesArray
  return instancesArray
}
export function campaignsForList(campaignsArray: any[]) {
  let convertedCampaignsArray = []
  campaignsArray.forEach((campaign: any) =>
    convertedCampaignsArray.push({
      id: campaign.id,
      type: campaign.type,
      active: campaign.active,
      reward_points: campaign.reward_points,
    })
  )
  campaignsArray = convertedCampaignsArray
  return campaignsArray
}

export function redemptionsForList(redemptionsArray: any[]) {
  let convertedRedemptionsArray = []
  redemptionsArray.forEach((redemption: any) =>
    convertedRedemptionsArray.push({
      id: redemption.id,
      type: redemption.discount_type,
      name: redemption.name,
      cost_in_points: redemption.cost_in_points,
      rate_in_cents: redemption.discount_rate_cents,
      active: redemption.is_offline,
    })
  )
  redemptionsArray = convertedRedemptionsArray
  return redemptionsArray
}

export function vipTiersForList(vipTiersArray: any[]) {
  let convertedVIPArray = []
  vipTiersArray.forEach((vipTier: any) =>
    convertedVIPArray.push({
      rank: vipTier.rank,
      id: vipTier.id,
      name: vipTier.name,
      multiplier: vipTier.points_multiplier,
      entry_reward: vipTier.reward_points,
    })
  )
  vipTiersArray = convertedVIPArray
  return vipTiersArray
}

export function editAllLoyaltyInstanceLoginAndRegistrationURLs(
  guid: string,
  loginURL: string,
  registrationURL: string
) {
  try {
    fetchLoyaltyInstancesData(guid).then((response) => {
      let instances: Array<any> = response.instances
      instances.forEach((instance: any) => {
        let staticContent: any
        fetchSingleLoyaltyInstanceData(guid, instance.widget_instance_id).then(
          (response) => {
            staticContent = response.instance.static_content
            for (let property in staticContent) {
              if (
                (property === 'storeAccountLoginUrl' ||
                  property === 'storeLoginUrl') &&
                loginURL.length > 0
              ) {
                staticContent[property] = loginURL
              } else if (
                (property === 'storeAccountRegistrationUrl' ||
                  property === 'storeRegistrationUrl') &&
                registrationURL.length > 0
              ) {
                staticContent[property] = registrationURL
              }
            }
            console.log(staticContent)

            editSingleLoyaltyInstanceStaticContent(
              guid,
              instance.widget_instance_id,
              staticContent
            )
          }
        )
      })
    })
  } catch (error) {
    return error
  }
}

export function orderChildInstances(instanceArray: any) {
  const instances = groupBy(instanceArray, (obj) => obj.parent_instance_id)
  return instances
}
