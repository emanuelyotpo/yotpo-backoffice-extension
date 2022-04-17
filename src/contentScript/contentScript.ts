function findAppkey() {
  let pattern = /staticw2.yotpo.com.(\w*)/
  let n: any
  let appkey: any
  let bottomline: any
  let id: any
  let isAppKeyInstalled: boolean

  n = document.querySelector("script[src*='//staticw2.yotpo.com']")
    ? pattern.exec(
        document
          .querySelector("script[src*='//staticw2.yotpo.com']")
          .getAttribute('src')
      )
    : undefined

  if (!n) {
    appkey = 'No App Key Here'
    bottomline = '-----'
    id = '-----'
    isAppKeyInstalled = false
  } else {
    appkey = n[1]
    isAppKeyInstalled = true
    if (document.querySelectorAll('.yotpo.bottomLine').length === 0) {
      bottomline = 'NO STAR RATINGS HERE'
    } else {
      bottomline = 'Star Ratings Are Installed!'
    }
    if (document.querySelectorAll('.yotpo-main-widget').length !== 0) {
      id = document
        .querySelectorAll('.yotpo-main-widget')[0]
        .getAttribute('data-product-id')
    } else {
      id = '-----'
    }
  }

  let platform = function () {
    let platformNames = [
      'shopify',
      'bigcommerce',
      'magento',
      'magento2',
      'woocommerce',
    ]
    let currentPlatform: string

    platformNames.forEach((platform) => {
      if (
        document.querySelectorAll(`script[src*=\'${platform}\']`).length === 0
      ) {
        return
      } else {
        currentPlatform = platform
      }
    })
    return currentPlatform
  }

  let details = {
    appkey: appkey,
    bottomline: bottomline,
    id: id,
    isAppKeyInstalled: isAppKeyInstalled,
    platform: platform(),
  }
  return details
}

function findGuid() {
  let n: any
  let guid: any
  let customerIdentification: any
  let customerId: any
  let customerEmail: any
  let customerTags: any
  let isGuidInstalled: boolean

  n = document.querySelector(
    "script[src*='//cdn-widgetsrepository.yotpo.com/v1/loader']"
  ) ? document
  .querySelector(
    "script[src*='//cdn-widgetsrepository.yotpo.com/v1/loader']"
  )
  .getAttribute('src') : undefined

  if (!n) {
    guid = 'No GUID Here'
    customerIdentification = '-----'
    customerId = '-----'
    customerEmail = '-----'
    customerTags = '-----'
    isGuidInstalled = false
  } else {
    guid = n.substring(n.lastIndexOf('/') + 1, n.length)
    isGuidInstalled = true
    let customerIdentificationDiv = document.querySelectorAll(
      '#swell-customer-identification'
    )
    if (customerIdentificationDiv.length === 0) {
      customerIdentification = 'NO CUSTOMER IDENTIFICATION HERE'
      customerId = '-----'
      customerEmail = '-----'
      customerTags = '-----'
    } else {
      customerIdentification = 'Customer identification is installed!'
      customerId = customerIdentificationDiv[0].getAttribute('data-id')
      customerEmail = customerIdentificationDiv[0].getAttribute('data-email')

      if (customerIdentificationDiv[0].getAttribute('data-tags')) {
        customerTags = customerIdentificationDiv[0].getAttribute('data-tags')
      } else {
        customerTags = '-----'
      }
    }
  }

  let details = {
    guid: guid,
    customerIdentification: customerIdentification,
    customerId: customerId,
    customerEmail: customerEmail,
    customerTags: customerTags,
    isGuidInstalled: isGuidInstalled,
  }
  return details
}

function docReady(fn: any) {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    setTimeout(fn, 1)
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.init) {
    case 'go':
      try {
        docReady(function () {
          findAppkey()
          findGuid()
        })
        let reviewsData = findAppkey()
        let loyaltyData = findGuid()
        sendResponse({
          data: { reviewsData: reviewsData, loyaltyData: loyaltyData },
        })
      } catch (error) {
        console.log(error)
      }
      break
  }
})
