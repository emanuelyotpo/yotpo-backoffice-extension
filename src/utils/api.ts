export async function fetchReviewsData(
  appkey: string,
  productId: string,
  page?: number
): Promise<any> {
    const res = await fetch(
      `https://api-cdn.yotpo.com/v1/widget/${appkey}/products/${productId}/reviews.json?per_page=100?page${page}`
    )

  if (!res.ok) {
    throw new Error('Not found')
  }

  const data: any = await res.json()
  return data
}

export async function fetchLoyaltyData(guid: string): Promise<any> {
  
  const res = await fetch(
    `http://widgetsrepository.us-east-1.yotpo.xyz/v1/${guid}/widget_instances`
  )
if (!res.ok) {
  throw new Error('Not found')
}

const data: any = await res.json()


return data
}