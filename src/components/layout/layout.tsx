import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Layout.css'
import ReviewsTab from '../reviews-tab/reviews-tab'
import LoyaltyTab from '../loyalty-tab/loyalty-tab'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux'
import { fetchLoyaltyData, fetchReviewsData } from '../../utils/api'
import { ActionType } from '../Redux/action-types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export default function Layout() {
  let dispatch = useDispatch();
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  chrome.runtime.sendMessage({ init: 'go' }, async (response: any) => {    
    if (response.reviewsData.isAppKeyInstalled) {
      dispatch({ type: ActionType.SetInitialReviewsData, payload: response.reviewsData })
      fetchReviewsData(response.reviewsData.appkey, response.reviewsData.id)
        .then((data) => {
          dispatch({ type: ActionType.SetMoreReviewsData, payload: data.response })
          dispatch({ type: ActionType.SetGroupedReviews, payload: data.response })
          dispatch({ type: ActionType.SetSyndicatedReviews, payload: data.response })
        })
        .catch((error) => console.log(error))
      }

    if (response.loyaltyData.isGuidInstalled) {
      dispatch({ type: ActionType.SetLoyaltyData, payload: response.loyaltyData })
      fetchLoyaltyData(response.loyaltyData.guid)
      .then((data) => {
        dispatch({ type: ActionType.SetMoreLoyaltyData, payload: data })
      })
      .catch((error) => console.log(error))
    }
    
  })


  return (
    <div className="layout">
      <img className="logo" src="logo.png" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Reviews" {...a11yProps(0)} />
            <Tab label="Loyalty" {...a11yProps(1)} />
            <Tab label="SMS" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ReviewsTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LoyaltyTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p>SMS here!</p>
        </TabPanel>
      </Box>
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
      aria-labelledby={`simple-tab-${index}`}
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
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
