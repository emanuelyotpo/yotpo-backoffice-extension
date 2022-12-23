import { YotpoProducts } from '@yotpo-common/react-b2b-components/enums'
import {
  setStoredOptions,
  getStoredOptions,
  SyncStorageOptions,
} from '../utils/storage'

let options: SyncStorageOptions = {
  tabs: [
    {
      id: 1,
      label: 'Reviews',
      value: 'reviews',
      product: YotpoProducts.reviews,
      tab: `<ReviewsTab />`,
    },
    {
      id: 2,
      label: 'Loyalty',
      value: 'loyalty',
      product: YotpoProducts.loyalty,
      tab: `<LoyaltyTab />`,
    },
    {
      id: 3,
      label: 'VMS',
      value: 'vms',
      product: YotpoProducts.vugc,
      tab: `<VMSTab />`,
    },
    {
      id: 4,
      label: 'SMS',
      value: 'sms',
      product: YotpoProducts.smsbump,
      tab: `<SMSTab />`,
    },
    {
      id: 5,
      label: 'Subscriptions',
      value: 'subscriptions',
      product: YotpoProducts.subscriptions,
      tab: `<SubscriptionTab />`,
    },
    {
      id: 6,
      label: 'Accounts',
      value: 'accounts',
      tab: `<AccountsTab />`,
    },
  ],
  js: [
    {
      name: 'JS.do',
      url: 'https://js.do/',
      value: 'jsdo',
      isDefault: true,
    },
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
  ],
  accounts: [],
  darkMode: false,
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    setStoredOptions(options)
  } else {
    getStoredOptions().then((storedOptions: any) => {
      if (storedOptions) {
        !('darkMode' in storedOptions) && (storedOptions.darkMode = false)
        console.log(storedOptions)
        setStoredOptions(storedOptions)
      } else {
        setStoredOptions(options)
      }
    })
  }
})

// Listen to messages from the main popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  debugger
  switch (message.init) {
    case 'go':
      sendToContent((data: any) => {
        sendResponse(data)
      })
      break
  }
  return true
})

// send a message to the content script and return data collected from the page
let sendToContent = (data: any) => {
  // chrome.windows.getLastFocused((win) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { init: 'go' }, (response: any) => {
        if (response) {
          data(response.data)
        }
      })
    }
  })
  // })
}
