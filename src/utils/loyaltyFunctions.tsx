import {
  editSingleLoyaltyInstanceStaticContent,
  fetchLoyaltyInstancesData,
  fetchSingleLoyaltyInstanceData,
} from './api'

export function instancesForList(insancesArray: any[]) {
  insancesArray.forEach((instance: any) => {
    instance.id = instance.widget_instance_id
    instance.key = instance.widget_type_name
    instance.value = instance.instance_name
    instance.type = 'loyaltyInstance'
    instance.loginUrl = 
      instance.static_content.storeLoginUrl ||
      instance.static_content.storeAccountLoginUrl ||
      'N/A'
    instance.registrationUrl =
      instance.static_content.storeRegistrationUrl ||
      instance.static_content.storeAccountRegistrationUrl ||
      'N/A'
  })
  return insancesArray
}
export function campaignsForList(campaignsArray: any[]) {
  campaignsArray.forEach((campaign: any) => {
    campaign.key = campaign.type
    campaign.value = campaign.id
    campaign.type = 'loyaltyCampaign'
  })
  return campaignsArray
}

export function redemptionsForList(redemptionsArray: any[]) {
  redemptionsArray.forEach((redemption: any) => {
    redemption.key = redemption.discount_type
    redemption.value = redemption.name
    redemption.type = 'loyaltyCampaign'
  })
  return redemptionsArray
}

export function vipTiersForList(vipTiersArray: any[]) {
  vipTiersArray.forEach((vipTier: any) => {
    vipTier.key = vipTier.rank
    vipTier.value = vipTier.name
    vipTier.type = 'loyaltyVipTier'
  })
  return vipTiersArray
}

export function editAllLoyaltyInstanceStaticContent(
  guid: string,
  loginURL: string,
  registrationURL: string
) {
  fetchLoyaltyInstancesData(guid).then((response) => {
    let instances: Array<any> = response.instances
    instances.forEach((instance: any) => {
      let staticContent: any
      fetchSingleLoyaltyInstanceData(guid, instance.widget_instance_id)
        .then((response) => {
          staticContent = response.instance.static_content
          if (
            !staticContent.storeAccountLoginUrl &&
            !staticContent.storeAccountRegistrationUrl &&
            !staticContent.storeLoginUrl &&
            !staticContent.storeRegistrationUrl
          ) {
            return
          } else if (
            staticContent.storeAccountLoginUrl &&
            staticContent.storeAccountRegistrationUrl
          ) {
            staticContent.storeAccountLoginUrl = loginURL
            staticContent.storeAccountRegistrationUrl = registrationURL
          } else if (
            staticContent.storeLoginUrl &&
            staticContent.storeRegistrationUrl
          ) {
            staticContent.storeLoginUrl = loginURL
            staticContent.storeRegistrationUrl = registrationURL
          } else if (staticContent.storeAccountLoginUrl) {
            staticContent.storeAccountLoginUrl = loginURL
          } else if (staticContent.storeAccountRegistrationUrl) {
            staticContent.storeAccountRegistrationUrl = registrationURL
          } else if (staticContent.storeLoginUrl) {
            staticContent.storeLoginUrl = loginURL
          } else if (staticContent.storeRegistrationUrl) {
            staticContent.storeRegistrationUrl = registrationURL
          }

          editSingleLoyaltyInstanceStaticContent(
            guid,
            instance.widget_instance_id,
            staticContent
          )
        })
        .catch((error) => console.log(error))
    })
  })
}
