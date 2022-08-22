import { fetchReviewsData } from './api'
import _ from 'lodash'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoStatus } from '@yotpo-common/react-b2b-components/enums'

export function richSnippetsResultsConnector() {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    function (tabs) {
      let a = 'https://search.google.com/test/rich-results?url=' + tabs[0].url
      window.open(a)
    }
  )
}

export async function getReviewsCountsAndData(
  appKey: string,
  productId: string,
  pages: number,
  perPage: number
): Promise<any> {
  let groupedReviewsCount = 0
  let syndicatedReviewsCount = 0
  let reviews = new Set()
  let totalPages = Math.ceil(pages / perPage)
  let page = 1
  do {
    try {
      const resp = await fetchReviewsData(appKey, productId, page)
      let result = resp

      let groupingData = Object.keys(result.response.grouping_data)
      let groupedReviewsLength = groupingData.length
      groupedReviewsCount = groupedReviewsCount + groupedReviewsLength

      if (result.response.syndication_data) {
        let syndicatedReviews = Object.keys(result.response.syndication_data)
        let syndicatedReviewsLength = syndicatedReviews.length
        syndicatedReviewsCount =
          syndicatedReviewsCount + syndicatedReviewsLength
      }
      for (let i = 0; i <= result.response.reviews.length - 1; i++) {
        reviews.add(result.response.reviews[i])
      }
      page++
    } catch (error) {
      return error
    }
  } while (page <= totalPages)

  return {
    groupedReviewsCount,
    syndicatedReviewsCount,
  }
}
