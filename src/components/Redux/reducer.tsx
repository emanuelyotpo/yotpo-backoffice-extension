import React from 'react'
import { fetchReviewsData } from '../../utils/api'
import {
  getGroupedReviews,
  getSyndicatedReviews,
} from '../../utils/reviewsFunctions'
import { Action } from './action'
import { ActionType } from './action-types'
import { AppData } from './AppData'

export function reduce(
  oldAppData: AppData = new AppData(),
  action: Action
): AppData {
  const newAppData = { ...oldAppData }

  switch (action.type) {
    case ActionType.SetInitialReviewsData:
      newAppData.appkey = action.payload.appkey
      newAppData.reviewsPlatform = action.payload.platform
      newAppData.productId = action.payload.id
      newAppData.isBottomLineInstalled = action.payload.bottomline
      break

    case ActionType.SetMoreReviewsData:
      newAppData.productName = action.payload.products[0].name
      newAppData.productImageURL = action.payload.products[0].image_url
      newAppData.totalReviews = action.payload.bottomline.total_review
      newAppData.avgScore = action.payload.bottomline.average_score
      newAppData.customQuestionsDetails = Object.values(
        action.payload.bottomline.custom_fields_bottomline
      )
      newAppData.customQuestionsSlugs = Object.keys(
        action.payload.bottomline.custom_fields_bottomline
      )
      break

    case ActionType.SetGroupedReviews:
      newAppData.groupedReviews = ...newAppData.groupedReviews
      let reviewsData = action.payload
      let page = 1
      let totalPages = Math.round(
        reviewsData.pagination.total / reviewsData.pagination.per_page
      )
      if (!totalPages) {
        fetchReviewsData(newAppData.appkey, newAppData.productId, page)
          .then((data) => {
            newAppData.groupedReviews =
              newAppData.groupedReviews + getGroupedReviews(data)
            console.log(getGroupedReviews(data))
            console.log(newAppData.groupedReviews)
          })
          .catch((error) => console.log(error))
      } else {
        while (page < totalPages) {
          fetchReviewsData(newAppData.appkey, newAppData.productId, page)
            .then((data) => {
              newAppData.groupedReviews =
                newAppData.groupedReviews + getGroupedReviews(data)
            })
            .catch((error) => console.log(error))
          page++
        }
      }
      break

    case ActionType.SetSyndicatedReviews:
      // newAppData.groupedReviews = ...groupedReviews

      // reviewsData = action.payload
      // page = 1
      // totalPages = Math.round(
      //   reviewsData.pagination.total / reviewsData.pagination.per_page
      // )
      // if (!totalPages) {
      //   fetchReviewsData(newAppData.appkey, newAppData.productId, page)
      //     .then((data) => {
      //       newAppData.groupedReviews = getSyndicatedReviews(data)
      //       console.log(getGroupedReviews(data))
      //       console.log(newAppData.groupedReviews)
      //     })
      //     .catch((error) => console.log(error))
      // } else {
      //   while (page < totalPages) {
      //     fetchReviewsData(newAppData.appkey, newAppData.productId, page)
      //       .then((data) => {
      //         // console.log('data: ', data)
      //         newAppData.groupedReviews =
      //           newAppData.groupedReviews + getSyndicatedReviews(data)
      //       })
      //       .catch((error) => console.log(error))
      //     page++
      //   }
      // }

      break

    case ActionType.SetLoyaltyData:
      newAppData.guid = action.payload.guid
      newAppData.customerEmail = action.payload.customerEmail
      newAppData.customerId = action.payload.customerId
      newAppData.customerTags = action.payload.customerTags

      break
    case ActionType.SetMoreLoyaltyData:
      newAppData.instances = action.payload.instances
      newAppData.merchantId =
        action.payload.instances[0].static_content.merchantId

      let allLoyaltyPlatforms = newAppData.instances.map(
        (instance) => instance.static_content.platformName
      )
      let loyaltyPlatformsSet = new Set()
      allLoyaltyPlatforms.forEach((platformName) =>
        loyaltyPlatformsSet.add(platformName)
      )

      newAppData.loyaltyPlatforms = Array.from(loyaltyPlatformsSet).join(' ')
      newAppData.activeInstances = newAppData.instances.filter((instance) => {
        return instance.active === true
      })
      newAppData.inactiveInstances = newAppData.instances.filter((instance) => {
        return instance.active === false
      })
      newAppData.activeInstances.forEach(function (value, key) {
        newAppData.instancesForCopy.push(
          key + ' : ' + value.id + ' (' + value.name + ')'
        )
      })

      break
  }
  return newAppData
}
