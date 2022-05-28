import React, { Key, SyntheticEvent, useEffect, useState } from 'react'
import './Layout.css'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchVMSData,
  fetchLoyaltyInstancesData,
  fetchReviewsData,
  fetchLoyaltyCampaignsData,
  fetchLoyaltyRedemptionsData,
  fetchLoyaltyVipTiersData,
} from '../../utils/api'
import { ActionType } from '../Redux/actionTypes'
import { getGroupedAndSyndicatedReviewsCounts } from '../../utils/reviewsFunctions'
import { AppData } from '../Redux/AppData'
import { NotYotpoUser } from '../notYotpoUser/notYotpoUser'
import { TabPanelProps } from '../../models/ITabPanelProps'
import { ITabData } from '../../models/ITabData'
import { getStoredOptions, setStoredOptions } from '../../utils/storage'

export default function Layout() {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const isYotpoUser: boolean = useSelector(
    (state: AppData) => state.isYotpoUser
  )
  const tabs: ITabData[] = useSelector((state: AppData) => state.tabs)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  // Check which user is logged in
  chrome.identity.getProfileUserInfo(function (userInfo) {
    dispatch({
      type: ActionType.SetUser,
      payload: userInfo.email.includes('@yotpo.com'),
    })
  })

  if (isYotpoUser) {
    chrome.windows.getCurrent((w) => {
      chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
        if (tabs[0].title !== 'New Tab') {
          let urlObj = new URL(tabs[0].url)
          dispatch({
            type: ActionType.SetSiteDomain,
            payload: urlObj,
          })
          chrome.runtime.sendMessage({ init: 'go' }, async (response: any) => {
            if (response.reviewsData.appkey) {
              dispatch({
                type: ActionType.SetInitialReviewsData,
                payload: response.reviewsData,
              })

              if (response.reviewsData.productId !== '-----' || null) {
                fetchReviewsData(
                  response.reviewsData.appkey,
                  response.reviewsData.productId
                )
                  .then((data) => {
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
                      response.reviewsData.appkey,
                      response.reviewsData.productId,
                      data.response.pagination.total,
                      data.response.pagination.per_page
                    ).then((data) => {
                      dispatch({
                        type: ActionType.SetGroupedAndSyndicatedReviewCount,
                        payload: {
                          groupedReviews: data.groupedReviewsCount,
                          syndicatedReviews: data.syndicatedReviewsCount,
                        },
                      })
                    })
                  })
                  .catch((error) => console.log(error))
              }
            }

            if (response.loyaltyData.guid) {
              dispatch({
                type: ActionType.SetLoyaltyData,
                payload: response.loyaltyData,
              })
              if (response.loyaltyData.guid !== 'No GUID Here') {
                fetchLoyaltyInstancesData(response.loyaltyData.guid)
                  .then((data) => {
                    dispatch({
                      type: ActionType.SetMoreLoyaltyData,
                      payload: data,
                    })
                    fetchLoyaltyCampaignsData(
                      response.loyaltyData.guid,
                      data.instances[0].static_content.merchantId
                    ).then((data) => {
                      dispatch({
                        type: ActionType.SetLoyaltyCampaigns,
                        payload: data,
                      })
                    })
                    fetchLoyaltyRedemptionsData(response.loyaltyData.guid).then(
                      (data) => {
                        dispatch({
                          type: ActionType.SetLoyaltyRedemptions,
                          payload: data,
                        })
                      }
                    )
                    fetchLoyaltyVipTiersData(response.loyaltyData.guid).then(
                      (data) => {
                        dispatch({
                          type: ActionType.SetLoyaltyVipTiers,
                          payload: data,
                        })
                      }
                    )
                  })
                  .catch((error) => console.log(error))
              }
            }
            if (response.vmsData.isAppKeyInstalled) {
              dispatch({
                type: ActionType.SetVMSData,
                payload: response.vmsData,
              })
              if (response.vmsData.vmsProductId) {
                fetchVMSData(
                  response.vmsData.vmsAppkey,
                  response.vmsData.vmsProductId
                )
                  .then((data) => {
                    dispatch({
                      type: ActionType.SetMoreVMSData,
                      payload: {
                        productImages: data.response.pagination.total,
                      },
                    })
                  })
                  .catch((error) => console.log(error))
              }
            }
            if (response.smsData.isSMSScriptInstalled) {
              dispatch({
                type: ActionType.SetSMSData,
                payload: response.smsData,
              })
            }
          })
        }
      })
    })
  }

  useEffect(() => {
    getStoredOptions().then((options) => dispatch({ type: ActionType.SetStoredOptions, payload: options}))
  }, [])

  return (
    <div className="layout">
      <img className="logo" src="logo.png" />
      {isYotpoUser ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              allowScrollButtonsMobile
            >
              {tabs.map((tabInfo, index: Key | null | undefined) => (
                <Tab
                  key={index}
                  label={tabInfo.label}
                  {...a11yProps(tabInfo.i)}
                />
              ))}
            </Tabs>
          </Box>
          {tabs.map((tabInfo, index: Key | null | undefined) => (
            <TabPanel key={index} value={value} index={tabInfo.i}>
              {tabInfo.tab}
            </TabPanel>
          ))}
        </Box>
      ) : (
        <NotYotpoUser />
      )}
    </div>
  )
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
  }
}
