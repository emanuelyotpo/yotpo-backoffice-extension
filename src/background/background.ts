import { setStoredOptions } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    tabs: [
      { label: 'Reviews', value: 'reviews', i: 0, tab: `<ReviewsTab />` },
      { label: 'Loyalty', value: 'loyalty', i: 1, tab: `<LoyaltyTab />` },
      { label: 'VMS', value: 'vms', i: 2, tab: `<VMSTab />` },
      { label: 'SMS', value: 'sms', i: 3, tab: `<SMSTab />` },
    ],
    js: [
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
    ],
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.init) {
    case 'go':
      sendToContent((data: any) => {
        sendResponse(data)
      })
      break
  }
  return true
})

// send a message to the content script
let sendToContent = (data: any) => {
  chrome.windows.getCurrent((w) => {
    chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
      let tabId = tabs[0].id
      chrome.tabs.sendMessage(tabId, { init: 'go' }, (response: any) => {
        data(response.data)
      })
    })
  })
}
