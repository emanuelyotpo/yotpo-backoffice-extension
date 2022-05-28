import { Button, Link, List, ListItem, ListItemText } from '@mui/material'
import React, { Key, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLoyaltyCampaignsData,
  fetchLoyaltyInstancesData,
  fetchLoyaltyRedemptionsData,
  fetchReviewsData,
} from '../../utils/api'
import { getGroupedAndSyndicatedReviewsCounts } from '../../utils/reviewsFunctions'
import { ActionType } from '../Redux/actionTypes'
import { AppData } from '../Redux/AppData'
import './dataList.css'

export default function DataList(props: any) {
  let appkey = useSelector((state: AppData) => state.appkey)
  let productId = useSelector((state: AppData) => state.productId)
  let guid = useSelector((state: AppData) => state.guid)

  const [toggle, setToggle] = useState(true)
  let dispatch = useDispatch()

  function toggleInput() {
    setToggle(false)
  }

  function handleChange(dataId: string, event: any) {
    if (!event.target.value) {
      return
    }
    dispatch({
      type: ActionType.UpdateDataManually,
      payload: {
        field: dataId,
        newValue: event.target.value,
      },
    })
  }

  function handleSubmit() {
    setToggle(true)
    if (
      appkey !== 'No App Key Here' &&
      productId !== '-----' &&
      appkey !== '' &&
      productId !== ''
    ) {
      fetchReviewsData(appkey, productId)
        .then((data) => {
          if (!data.response.products[0]) {
            dispatch({
              type: ActionType.SetMoreReviewsData,
              payload: {
                bottomline: '0',
                productName: '',
                productImageURL: '',
                avgScore: '0',
                totalReviews: '0',
              },
            })
            dispatch({
              type: ActionType.SetGroupedAndSyndicatedReviewCount,
              payload: {
                groupedReviews: '0',
                syndicatedReviews: '0',
              },
            })
          } else {
            dispatch({
              type: ActionType.SetMoreReviewsData,
              payload: {
                productName: data.response.products[0].name,
                productImageURL: data.response.products[0].image_url,
                totalReviews: data.response.bottomline.total_review,
                avgScore: data.response.bottomline.average_score,
              },
            })
            getGroupedAndSyndicatedReviewsCounts(
              appkey,
              productId,
              data.response.pagination.total,
              data.response.pagination.per_page
            ).then((data) => {
              dispatch({
                type: ActionType.SetGroupedAndSyndicatedReviewCount,
                payload: data,
              })
            })
          }
        })
        .catch((error) => console.log(error))
    }
    if (guid !== 'No GUID Here' && guid !== '') {
      fetchLoyaltyInstancesData(guid)
        .then((data) => {
          dispatch({ type: ActionType.SetMoreLoyaltyData, payload: data })
          fetchLoyaltyCampaignsData(
            guid,
            data.instances[0].static_content.merchantId
          ).then((data) => {
            dispatch({
              type: ActionType.SetLoyaltyCampaigns,
              payload: data,
            })
          })
          fetchLoyaltyRedemptionsData(guid).then((data) => {
            dispatch({
              type: ActionType.SetLoyaltyRedemptions,
              payload: data,
            })
          })
        })
        .catch((error) => console.log(error))
    }
  }

  let dataValues = props.data
  let linkRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {dataValues.map(
          (
            data: {
              key: string
              value: string
              id: string
            },
            index: Key | null | undefined
          ) => {
            if (linkRegex.exec(data.value))
              return (
                <ListItem id={data.id} key={index}>
                  {`${data.key}:\u00A0`}
                  <Link target="_blank" href={data.value}>
                    Link
                  </Link>
                </ListItem>
              )
            return (
              <>
                <ListItem id={data.id} key={index}>
                  {`${data.key}:\u00A0`}
                  {data.id !== 'appkey' &&
                  data.id !== 'productId' &&
                  data.id !== 'guid' ? (
                    <ListItemText primary={data.value} />
                  ) : (
                    <>
                      {toggle ? (
                        <ListItemText
                          primary={data.value}
                          onDoubleClick={toggleInput}
                        />
                      ) : (
                        <>
                          <input
                            type="text"
                            defaultValue={data.value}
                            onChange={() => handleChange(data.id, event)}
                          />
                          <Button onClick={() => handleSubmit()}>SUBMIT</Button>
                        </>
                      )}
                    </>
                  )}
                </ListItem>
              </>
            )
          }
        )}
      </List>
    </>
  )
}
