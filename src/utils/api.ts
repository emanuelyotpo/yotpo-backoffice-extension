export async function fetchReviewsData(
  appkey: string,
  productId: string,
  page?: number
): Promise<any> {
  const res = await fetch(
    `https://api-cdn.yotpo.com/v1/widget/${appkey}/products/${productId}/reviews.json?per_page=150?page=${page}`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}

export async function fetchLoyaltyInstancesData(guid: string): Promise<any> {
  const res = await fetch(
    `http://widgetsrepository.us-east-1.yotpo.xyz/v1/${guid}/widget_instances`
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
    `http://widgetsrepository.us-east-1.yotpo.xyz/v1/${guid}/widget_instances/${instanceId}`
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
    `http://widgetsrepository.us-east-1.yotpo.xyz/v1/${guid}/widget_instances/${instanceId}`,
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

export async function fetchLoyaltyCampaignsData(
  guid: string,
  merchantId: number
): Promise<any> {
  const res = await fetch(
    `https://loyalty.yotpo.com/api/public/v1/campaigns?guid=${guid}&merchant_id=${merchantId}`
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

export async function fetchVMSData(appkey: string, productId: string) {
  const res = await fetch(
    `https://api.yotpo.com/v1/widget/${appkey}/albums/product/${productId}?per_page=56`
  )
  if (!res.ok) {
    throw new Error('Not found')
  }
  const data: any = await res.json()
  return data
}
