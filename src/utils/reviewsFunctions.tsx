import { IGroupedAndSyndicatedCountResponse } from '../models/IGroupedAndSyndicatedCountResponse'
import { fetchReviewsData } from './api'

export function richSnippetsResultsConnector() {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    function (tabs) {
      var a = 'https://search.google.com/test/rich-results?url=' + tabs[0].url
      window.open(a)
    }
  )
}

export async function getGroupedAndSyndicatedReviewsCounts(
  appkey: string,
  productId: string,
  pages: number,
  perPage: number
): Promise<IGroupedAndSyndicatedCountResponse> {
  let groupedReviewsCount = 0
  let syndicatedReviewsCount = 0
  let totalPages = Math.ceil(pages / perPage)
  let page = 1
  do {
    try {
      const resp = await fetchReviewsData(appkey, productId, page);

      let result = resp;
      let groupingData = Object.keys(result.response.grouping_data);
      let groupedReviewsLength = groupingData.length;
      groupedReviewsCount = groupedReviewsCount + groupedReviewsLength;

      if (result.response.syndication_data) {
        let syndicatedReviews = Object.keys(result.response.syndication_data);
        let syndicatedReviewsLength = syndicatedReviews.length;
        syndicatedReviewsCount =
          syndicatedReviewsCount + syndicatedReviewsLength;
      };
      page++
    } catch (err) {
      console.error(err)
    }
  } while (page <= totalPages);
  return {
    groupedReviewsCount,
    syndicatedReviewsCount,
  }
}
