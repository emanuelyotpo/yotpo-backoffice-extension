import {
  editSingleLoyaltyInstanceStaticContent,
  fetchLoyaltyInstancesData,
  fetchSingleLoyaltyInstanceData,
} from './api'
import _ from 'lodash'
import React from 'react'
import EditStaticContent from '../components/editStaticContent/editStaticContent'

export function instancesForList(guid: string, instancesArray: any[]) {
  let convertedInstancesArray = []
  instancesArray.forEach((instance: any) => {
    if (instance.parent_instance_id) {
      convertedInstancesArray.push({
        id: instance.widget_instance_id,
        type: instance.widget_type_name,
        parent_id: instance.parent_instance_id,
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
        static_content: (
          <EditStaticContent
            instance={{
              id: instance.widget_instance_id,
              guid,
            }}
          />
        )
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
      discount_rate_cents: redemption.discount_rate_cents,
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
      points_multiplier: vipTier.points_multiplier,
      reward_points: vipTier.reward_points,
    })
  )
  vipTiersArray = convertedVIPArray
  return vipTiersArray
}

export function editAllLoyaltyInstanceStaticContent(
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

            staticContent.storeAccountLoginUrl &&
            staticContent.storeAccountRegistrationUrl
              ? ((staticContent.storeAccountLoginUrl = loginURL),
                (staticContent.storeAccountRegistrationUrl = registrationURL))
              : staticContent.storeAccountLoginUrl === '' &&
                staticContent.storeAccountRegistrationUrl === ''
              ? ((staticContent.storeAccountLoginUrl = loginURL),
                (staticContent.storeAccountRegistrationUrl = registrationURL))
              : staticContent.storeLoginUrl &&
                staticContent.storeRegistrationUrl
              ? ((staticContent.storeLoginUrl = loginURL),
                (staticContent.storeRegistrationUrl = registrationURL))
              : staticContent.storeLoginUrl === '' &&
                staticContent.storeRegistrationUrl === ''
              ? ((staticContent.storeLoginUrl = loginURL),
                (staticContent.storeRegistrationUrl = registrationURL))
              : staticContent.storeAccountLoginUrl
              ? (staticContent.storeAccountLoginUrl = loginURL)
              : staticContent.storeAccountLoginUrl === ''
              ? (staticContent.storeAccountLoginUrl = loginURL)
              : staticContent.storeAccountRegistrationUrl
              ? (staticContent.storeAccountRegistrationUrl = registrationURL)
              : staticContent.storeAccountRegistrationUrl === ''
              ? (staticContent.storeAccountRegistrationUrl = registrationURL)
              : staticContent.storeLoginUrl
              ? (staticContent.storeLoginUrl = loginURL)
              : staticContent.storeLoginUrl === ''
              ? (staticContent.storeLoginUrl = loginURL)
              : staticContent.storeRegistrationUrl
              ? (staticContent.storeRegistrationUrl = registrationURL)
              : staticContent.storeRegistrationUrl === ''
              ? (staticContent.storeRegistrationUrl = registrationURL)
              : staticContent = staticContent

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
  const instances = _.groupBy(instanceArray, (obj) => obj.parent_instance_id)
  return instances
}
