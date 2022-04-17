import { useSelector } from 'react-redux'
import { AppData } from '../components/Redux/AppData'

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

export function setGroupedReviews(data: any){
  
}

export function getGroupedReviews(data: any) {
  let groupedReviews = data.response.grouping_data
  let groupedReviewsLength = Object.keys(groupedReviews).length
  return groupedReviewsLength
}

export function getSyndicatedReviews(data: any) {
  let syndicatedReviews = data.response.syndication_data
  let syndicatedReviewsLength = Object.keys(syndicatedReviews).length
  return syndicatedReviewsLength
}
