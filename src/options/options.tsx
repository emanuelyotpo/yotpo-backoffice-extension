import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ListItem,
  List,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  getStoredOptions,
  moveArrayItemToNewIndex,
  setDefaultJs,
  setStoredOptions,
  SyncStorageOptions,
} from '../utils/storage'
import { Draggable } from 'react-drag-reorder'
import './options.css'
import { ITabData } from '../models/ITabData'
import LoyaltyTab from '../components/loyaltyTab/loyaltyTab'
import ReviewsTab from '../components/reviewsTab/reviewsTab'
import SMSTab from '../components/smsTab/smsTab'
import VMSTab from '../components/vmsTab/vmsTab'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<SyncStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleJSChange = (value: string) => {
    setDefaultJs(js, value)
    setOptions({
      ...options,
      js,
    })
  }

  const handleTabsChange = (currentPos: any, newPos: any) => {
    moveArrayItemToNewIndex(tabs, currentPos, newPos)
    setOptions({
      ...options,
      tabs,
    })
  }

  let [js, setJs] = useState([
    { name: 'JS.do', url: 'https://js.do/', value: 'jsdo', isDefault: true },
    {
      name: 'JS Bin',
      url: 'https://jsbin.com/',
      value: 'jsbin',
      isDefault: false,
    },
    {
      name: 'JS Fiddle',
      url: 'https://jsfiddle.net/',
      value: 'jsfiddle',
      isDefault: false,
    },
  ])

  let [tabs, setTabs] = useState([
    { label: 'Reviews', value: 'reviews', i: 0, tab: <ReviewsTab /> },
    { label: 'Loyalty', value: 'loyalty', i: 1, tab: <LoyaltyTab /> },
    { label: 'VMS', value: 'vms', i: 2, tab: <VMSTab /> },
    { label: 'SMS', value: 'sms', i: 3, tab: <SMSTab /> },
  ])

  const handleSaveButtonClick = () => {
    setFormState('saving')
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready')
      }, 1000)
    })
  }

  if (!options) {
    return null
  }

  const isFieldsDisabled = formState === 'saving'
  return (
    <div className="options-page">
      <Box mx="10%" my="2%">
        <Card>
          <CardContent>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4">SE EXTENSION OPTIONS</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Tabs Order</Typography>
                <Draggable onPosChange={handleTabsChange}>
                  {options.tabs.map((tab, idx) => {
                    return (
                      <div key={idx} className="flex-item">
                        {tab.label}
                      </div>
                    )
                  })}
                </Draggable>
              </Grid>
              <Grid item>
                <Typography variant="body1">Default JS Envoirenmnet</Typography>
                <List>
                  {options.js.map((jsEnv, index) => {
                    return (
                      <ListItem>
                        <Radio
                          checked={jsEnv.isDefault}
                          onChange={(event) =>
                            handleJSChange(event.target.value)
                          }
                          value={jsEnv.value}
                          name={jsEnv.name}
                        />
                         {jsEnv.name}
                      </ListItem>
                    )
                  })}
                </List>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveButtonClick}
                  disabled={isFieldsDisabled}
                >
                  {formState === 'ready' ? 'Save' : 'Saving...'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
