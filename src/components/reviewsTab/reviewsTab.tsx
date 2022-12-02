import React, { useEffect } from 'react'
import './reviewsTab.css'
import { getReviewsCountsAndData } from '../../utils/reviewsFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { AppData } from '../redux/AppData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { IData } from '../../models/IData'
import { fetchReviewsData } from '../../utils/api'
import { ActionType } from '../redux/actionTypes'
import NestedList from '../nestedList/nestedList'
import { ICustomQuestion } from '../../models/ICustomQuestion'
import { IButton } from '../../models/IButton'
import { toast } from '../../utils/generalFunctions'

export default function ReviewsTab() {
  let appKey = useSelector((state: AppData) => state.appKey)
  let productId = useSelector((state: AppData) => state.productId)
  const dispatch = useDispatch()
  let reviewsData: IData[] = useSelector((state: AppData) => state.reviewsData)
  let buttons: IButton[] = useSelector((state: AppData) => state.reviewsButtons)
  let codeToCopy = useSelector((state: AppData) => state.reviewsCodeToCopy)
  let customFieldsAggregation: ICustomQuestion[] = useSelector(
    (state: AppData) => state.customFieldsAggregation
  )

  let setReviewsData = (appKey: string, productId: string) => {
    if (appKey && productId) {
      fetchReviewsData(appKey, productId, 1)
        .then((data) => {
          if (!data.response.products[0]) {
            dispatch({
              type: ActionType.SetReviewsData,
              payload: {
                bottomline: 0,
                productName: '',
                productImageURL: '',
                avgScore: 0,
                totalReviews: 0,
                customFieldsAggregation: {},
              },
            })
            dispatch({
              type: ActionType.setReviewsCountsAndData,
              payload: {
                groupedReviews: 0,
                syndicatedReviews: 0,
              },
            })
          } else {
            dispatch({
              type: ActionType.SetReviewsData,
              payload: {
                productName: data.response.products[0].name,
                productImageURL: data.response.products[0].image_url,
                totalReviews: data.response.bottomline.total_review,
                avgScore: data.response.bottomline.average_score,
                customFieldsAggregation: data.response.bottomline
                  .custom_fields_bottomline
                  ? data.response.bottomline.custom_fields_bottomline
                  : {},
              },
            })

            getReviewsCountsAndData(
              appKey,
              productId,
              data.response.pagination.total,
              data.response.pagination.per_page
            ).then((data) => {
              dispatch({
                type: ActionType.setReviewsCountsAndData,
                payload: {
                  groupedReviews: data.groupedReviewsCount,
                  syndicatedReviews: data.syndicatedReviewsCount,
                },
              })
            })
          }
        })
        .catch((error: any) => toast('danger', error))
    }
  }

  useEffect(() => {
    setReviewsData(appKey, productId)
  }, [appKey, productId])

  return (
    <div
      className="tab-content yotpo-text-large yotpo-text-primary"
      id="reviews"
    >
      <div className="data">
        <DataList data={reviewsData} />
        {customFieldsAggregation.length > 0 && (
          <NestedList
            data={customFieldsAggregation}
            listTitle="Custom Questions Aggregation"
          />
        )}
      </div>
      <Buttons
        buttons={buttons}
        codeToCopy={codeToCopy}
        redirectUri={'https://reviews.yotpo.com/'}
      ></Buttons>
    </div>
  )
}
