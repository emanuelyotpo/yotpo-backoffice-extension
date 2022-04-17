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
let sendToContent = (data: any) =>{
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {    
    chrome.tabs.sendMessage(tabs[0].id, { init: 'go' }, (response: any) => {      
      data(response.data)
    })
  })
}
