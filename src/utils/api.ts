export async function fetchReviewsData(
  appKey: string,
  productId: string,
  page?: number
): Promise<any> {
  if (!appKey && !productId) {
    return
  }
  const res = await fetch(
    `https://api-cdn.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json?per_page=150?page=${page}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  
  const data: any = await res.json()
  
  return data
}

export async function fetchLoyaltyInstancesData(guid: string): Promise<any> {
  const res = await fetch(
    `https://widgetsrepository-service-default.yotpo.xyz/v1/${guid}/widget_instances`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchSingleLoyaltyInstanceData(
  guid: string,
  instanceId: number
): Promise<any> {
  const res = await fetch(
    `https://widgetsrepository-service-default.yotpo.xyz/v1/${guid}/widget_instances/${instanceId}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function editSingleLoyaltyInstanceStaticContent(
  guid: string,
  instanceId: number,
  staticContent: any
): Promise<any> {
  const body = {
    instance: {
      widget_instance_id: instanceId,
      static_content: staticContent,
    },
  }

  const res = await fetch(
    `https://widgetsrepository-service-default.yotpo.xyz/v1/${guid}/widget_instances/${instanceId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchLoyaltyCampaignsData(guid: string): Promise<any> {
  const res = await fetch(
    `https://loyalty.yotpo.com/api/public/v1/campaigns?guid=${guid}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchLoyaltyRedemptionsData(guid: string): Promise<any> {
  const res = await fetch(
    `https://loyalty.yotpo.com/api/public/v1/redemption_options?guid=${guid}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchLoyaltyVipTiersData(guid: string): Promise<any> {
  const res = await fetch(
    `https://loyalty.yotpo.com/api/public/v1/tiers?guid=${guid}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchVMSData(appKey: string, productId: string) {
  if (!appKey && !productId) {
    throw new Error('No App Key and/or Product ID')
  }
  const res = await fetch(
    `https://api.yotpo.com/v1/widget/${appKey}/albums/product/${productId}?per_page=56`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchSiteHTML(siteURL: any) {
  const res = await fetch(`${siteURL}`)
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.text()
  return data
}
