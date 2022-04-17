import React from 'react'
import './reviews-tab.css'
import { richSnippetsResultsConnector } from '../../utils/reviewsFunctions'
import { useSelector } from 'react-redux'
import { AppData } from '../Redux/AppData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import NestedList from '../nestedList/nestedList'

export default function ReviewsTab() {
  let appkey = useSelector((state: AppData) => state.appkey)
  let platform = useSelector((state: AppData) => state.reviewsPlatform)
  let isBottomLineInstalled = useSelector(
    (state: AppData) => state.isBottomLineInstalled
  )
  let productId = useSelector((state: AppData) => state.productId)
  let productName = useSelector((state: AppData) => state.productName)
  let productImageURL = useSelector((state: AppData) => state.productImageURL)
  let avgScore = useSelector((state: AppData) => state.avgScore)
  let totalReviews = useSelector((state: AppData) => state.totalReviews)
  let groupedReviews = useSelector((state: AppData) => state.groupedReviews)
  let syndicatedReviews = useSelector(
    (state: AppData) => state.syndicatedReviews
  )
  let customQuestionsDetails = useSelector(
    (state: AppData) => state.customQuestionsDetails
  )
  let customQuestionsSlugs = useSelector(
    (state: AppData) => state.customQuestionsSlugs
  )

  let reviewsData = [
    { key: 'App Key: ', value: appkey, id: 'appkey' },
    { key: 'Platform: ', value: platform, id: 'platform' },
    { key: 'Stars: ', value: isBottomLineInstalled, id: 'bottomline' },
    { key: 'Product ID: ', value: productId, id: 'productId' },
    { key: 'Product Name: ', value: productName },
    { key: 'Image URL: ', value: productImageURL },
    { key: 'Average Score: ', value: avgScore },
    { key: 'total Reviews: ', value: totalReviews },
    { key: 'Grouped Reviews: ', value: groupedReviews },
    { key: 'Syndicated Reviews: ', value: syndicatedReviews }
  ]

  let moreReviewsData = [
    { key: 'Custom Questions: ', value: customQuestionsDetails },
    { key: 'Custom Questions Details: ', value: customQuestionsSlugs },
  ]

  let reviewsButtons = [
    {
      description: 'Test Rich Snippets',
      func: richSnippetsResultsConnector,
      toolTip: 'Test Rich Snippets',
    },
    {
      description: 'YOADMIN',
      toolTip: 'Open in YoAadmin',
      href: `https://admin.yotpo.com/accounts?utf8=%E2%9C%93&q=${appkey}&tags=&commit=Search`,
      target: '_blank',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: function () {
        navigator.clipboard.writeText(`
        <script type="text/javascript">
            (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/${appkey}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
        </script>
    
        <div class="yotpo bottomLine"
            data-product-id="${productId}">
        </div>	
        <div class="yotpo yotpo-main-widget"
            data-product-id="${productId}">
        </div>
        `)
      },
      href: 'https://js.do',
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]
  
  return (
    <div className="reviews">
      <DataList data={reviewsData} />
      <NestedList data={moreReviewsData} listTitle="Custom Questions" />

      {/* <ul>
        {productId && (
          <>
            <li>
            
              <ul>
                <li>
                  Custom Questions:{' '}
                  {customQuestionsSlugs.length > 0 && (
                    <ul id="customQuestionsList">
                      {customQuestionsDetails.map(
                        (
                          customQuestion: {
                            title: string
                            type: string
                            score: number
                            average_score: number
                          },
                          index: Key | null | undefined
                        ) => (
                          <li key={index}>
                            {customQuestionsSlugs[index]}:
                            <ul>
                              <li>
                                Title: <span>{customQuestion.title}</span>
                              </li>
                              <li>
                                Type: <span>{customQuestion.type}</span>
                              </li>
                              <li>
                                Score: <span>{customQuestion.score}</span>
                              </li>
                              <li>
                                Avg. Score:{' '}
                                <span>{customQuestion.average_score}</span>
                              </li>
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>  */}

      <Buttons buttons={reviewsButtons}></Buttons>
    </div>
  )
}
