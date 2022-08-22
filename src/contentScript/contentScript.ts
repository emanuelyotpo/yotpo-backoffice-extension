function getDataFromPage() {
  let oldReviewsJSPattern = /staticw2.yotpo.com.(\w*)/
  let patternSMS = /forms.smsbump.com.(\w*)/
  let nSMS: any
  let appKey: any
  let isStarRatingsInstalled: any
  let productId: any
  let guid: any
  let customerId: any
  let customerEmail: any
  let customerTags: any
  let customGalleryIds: any[] = []
  let productGalleryId: any
  let vmsProductId: any
  let userId: any
  let formId: any
  let scripts: any
  let isSMSScriptInstalled: any
  let isCustomerIdentificationInstalled: any
  let reviewsWidgetVersion: any
  let myShopifyUrl: any

  scripts = document.querySelectorAll(
    "script[src*='//cdn-widgetsrepository.yotpo.com/v1/loader']"
  )  

  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src) {
      let a = scripts[i].src.substring(
        scripts[i].src.lastIndexOf('/') + 1,
        scripts[i].src.length
      )
      if (a.length === 40) {
        appKey = a
        reviewsWidgetVersion = undefined
      } else if (a.length === 22) {
        guid = a
      } else {
        guid = undefined
        appKey = undefined
      }
    }
  }

  if (!appKey) {
    let n = document.querySelector("script[src*='//staticw2.yotpo.com']")
      ? oldReviewsJSPattern.exec(
          document
            .querySelector("script[src*='//staticw2.yotpo.com']")
            .getAttribute('src')
        )
      : undefined

    if (n) {
      appKey = n[1]
      let s = document.querySelector("link[href*='//staticw2.yotpo.com']")
        ? document
            .querySelector("link[href*='//staticw2.yotpo.com']")
            .getAttribute('href')
        : undefined

      if (s) {
        let unstrippedVersion = s.substring(s.lastIndexOf('?') + 1, s.length)
        reviewsWidgetVersion = unstrippedVersion.substring(
          unstrippedVersion.lastIndexOf('=') + 1,
          unstrippedVersion.length
        )
      } else {
        reviewsWidgetVersion = undefined
      }
    }
  }

  if (appKey) {
    isStarRatingsInstalled =
      document.querySelectorAll('#yotpo-reviews-star-ratings-widget').length >
        0 || document.querySelectorAll('.yotpo.bottomLine').length > 0
        ? 'Installed'
        : 'Not Installed'

    productId =
      document.querySelectorAll('#yotpo-reviews-main-widget').length > 0
        ? document
            .querySelectorAll('#yotpo-reviews-main-widget')[0]
            .parentElement.getAttribute('data-yotpo-product-id')
        : document.querySelectorAll('.yotpo-main-widget').length > 0
        ? document
            .querySelectorAll('.yotpo-main-widget')[0]
            .getAttribute('data-product-id')
        : undefined

    if (document.querySelectorAll('.yotpo-pictures-widget').length) {
      let galleries = document.querySelectorAll('.yotpo-pictures-widget')

      galleries.forEach((gallery: any) => {
        if (gallery.getAttribute('data-product-id')) {
          vmsProductId = gallery.getAttribute('data-product-id')
          productGalleryId = gallery.getAttribute('data-gallery-id')
        } else if (!gallery.getAttribute('data-product-id')) {
          customGalleryIds.push(gallery.getAttribute('data-gallery-id'))
        }
      })
    } else {
      customGalleryIds = undefined
      productGalleryId = undefined
      vmsProductId = undefined
    }
  } else {
    isStarRatingsInstalled = 'Not Installed'
    productId = undefined
  }

  if (!guid) {
    let n = document.querySelector(
      "script[src*='//cdn-loyalty.yotpo.com/loader/']"
    )
      ? document
          .querySelector("script[src*='//cdn-loyalty.yotpo.com/loader/']")
          .getAttribute('src')
      : undefined

    if (n) {
      guid = n.substring(n.lastIndexOf('/')).split('.js')[0].replace('/', '')
    }
  }

  let customerIdentificationDiv = document.querySelectorAll(
    '#swell-customer-identification'
  )
  if (customerIdentificationDiv.length === 0) {
    isCustomerIdentificationInstalled = 'Not Installed'
    customerId = undefined
    customerEmail = undefined
    customerTags = undefined
  } else {
    isCustomerIdentificationInstalled = 'Installed'
    if (customerIdentificationDiv[0].getAttribute('data-id')) {
      customerId = customerIdentificationDiv[0].getAttribute('data-id')
    } else {
      customerId = undefined
    }
    if (customerIdentificationDiv[0].getAttribute('data-email')) {
      customerEmail = customerIdentificationDiv[0].getAttribute('data-email')
    } else {
      customerEmail = undefined
    }

    if (customerIdentificationDiv[0].getAttribute('data-tags')) {
      customerTags = customerIdentificationDiv[0].getAttribute('data-tags')
    } else {
      customerTags = undefined
    }
  }
  nSMS = document.querySelector("script[src*='//forms.smsbump.com/']")
    ? patternSMS.exec(
        document
          .querySelector("script[src*='//forms.smsbump.com/']")
          .getAttribute('src')
      )
    : undefined

  if (!nSMS) {
    userId = undefined
    formId = undefined
    isSMSScriptInstalled = 'Not Installed'
  } else {
    userId = nSMS[1]
    formId = getStringBetween(nSMS.input, 'form_', '.js')
    isSMSScriptInstalled = 'Installed'
  }

  let platform = function () {
    let platformNames = [
      'shopify',
      'bigcommerce',
      'magento',
      'magento2',
      'woocommerce',
      'custom',
      'generic',
      'sfcc',
      'demandware',
      'salesforce',
    ]
    let currentPlatform: string

    platformNames.forEach((platform) => {
      if (
        document.querySelectorAll(`script[src*=\'${platform}\']`).length === 0
      ) {
        return
      } else {
        if (platform === 'demandware') {
          platform = 'salesforce'
        }
        currentPlatform = platform
      }
    })
    return currentPlatform
  }

  if (platform() === 'shopify') {
    myShopifyUrl = window.origin
  } else {
    myShopifyUrl = undefined
  }
  
  return {
    appKey: appKey,
    isStarRatingsInstalled: isStarRatingsInstalled,
    productId: productId,
    platform: platform(),
    reviewsWidgetVersion: reviewsWidgetVersion,
    guid: guid,
    isCustomerIdentificationInstalled: isCustomerIdentificationInstalled,
    customerId: customerId,
    customerEmail: customerEmail,
    customerTags: customerTags,
    customGalleryIds: customGalleryIds,
    productGalleryId: productGalleryId,
    vmsProductId: vmsProductId,
    userId: userId,
    formId: formId,
    isSMSScriptInstalled: isSMSScriptInstalled,
    myShopifyUrl: myShopifyUrl,
  }
}

function getStringBetween(str: string, start: string, end: string) {
  const result = str.match(new RegExp(start + '(.*)' + end))
  return result[1]
}

function DOMtoString(document_root) {
  var html = '',
    node = document_root.firstChild
  while (node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        html += node.outerHTML
        break
      case Node.TEXT_NODE:
        html += node.nodeValue
        break
      case Node.CDATA_SECTION_NODE:
        html += '<![CDATA[' + node.nodeValue + ']]>'
        break
      case Node.COMMENT_NODE:
        html += '<!--' + node.nodeValue + '-->'
        break
      case Node.DOCUMENT_TYPE_NODE:
        html +=
          '<!DOCTYPE ' +
          node.name +
          (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
          (!node.publicId && node.systemId ? ' SYSTEM' : '') +
          (node.systemId ? ' "' + node.systemId + '"' : '') +
          '>\n'
        break
    }
    node = node.nextSibling
  }
  return html
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
          getDataFromPage()
        })
        let data = getDataFromPage()
        sendResponse({
          data: data,
        })
      } catch (error) {
        throw new error(error)
      }
      break
  }
})
