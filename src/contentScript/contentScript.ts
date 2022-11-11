function getDataFromPage() {
  let oldReviewsJSPattern = /staticw2.yotpo.com.(\w*)/
  let patternSMS = /forms.smsbump.com.(\w*)/
  let nSMS: any
  let appKey: any
  let isReviewsWidgetV2Installed: boolean
  let isReviewsWidgetV3Installed: boolean
  let isStarRatingsV2Installed: boolean
  let isStarRatingsV3Installed: boolean
  let isReviewsCarouselInstalled: boolean
  let isQandAButtonInstalled: boolean
  let isQandAWidgetInstalled: boolean
  let isReviewHighlightsInstalled: boolean
  let isReviewsBadgeInstalled: boolean
  let isSEOPageInstalled: boolean
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
  let widgetRelease: any
  let subscriptionsProductPageInstanceID: any
  let subscriptionsMyAccountInstanceID: any

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
    }
  }

  if (appKey) {
    let scripts = document.querySelectorAll(
      "link[href*='//staticw2.yotpo.com']"
    )
    let stylesTags = document.querySelectorAll(
      "style[data-href*='//staticw2.yotpo.com']"
    )

    let cssLink = undefined

    if (scripts.length > 0) {
      for (let i = 0; i < scripts.length; i++) {
        for (let ii = 0; ii < scripts[i].attributes.length; ii++) {
          if (
            scripts[i].attributes[ii].name === 'type' &&
            scripts[i].attributes[ii].value === 'text/css'
          ) {
            cssLink = scripts[i].getAttribute('href')
          }
        }
      }
    }

    if (stylesTags.length > 0) {
      for (let i = 0; i < stylesTags.length; i++) {
        for (let ii = 0; ii < stylesTags[i].attributes.length; ii++) {
          if (String(stylesTags[i].attributes[ii].name) === 'data-href') {
            cssLink = stylesTags[i].attributes[ii].value
          }
        }
      }
    }

    if (cssLink) {
      let unstrippedVersion = cssLink.substring(
        cssLink.lastIndexOf('?') + 1,
        cssLink.length
      )
      reviewsWidgetVersion = unstrippedVersion.substring(
        unstrippedVersion.lastIndexOf('=') + 1,
        unstrippedVersion.length
      )
    } else {
      reviewsWidgetVersion = undefined
    }

    isReviewsWidgetV2Installed =
      document.querySelectorAll('.yotpo-main-widget').length > 0
    isReviewsWidgetV3Installed =
      document.querySelectorAll('#yotpo-reviews-main-widget').length > 0
    isStarRatingsV2Installed =
      document.querySelectorAll('.yotpo.bottomLine').length > 0
    isStarRatingsV3Installed =
      document.querySelectorAll('#yotpo-reviews-star-ratings-widget').length > 0
    isReviewsCarouselInstalled =
      document.querySelectorAll('.yotpo-reviews-carousel').length > 0
    isQandAButtonInstalled =
      document.querySelectorAll('.yotpo.QABottomLine').length > 0
    isQandAWidgetInstalled =
      document.querySelectorAll('.yotpo-main-widget[data-mode=questions]')
        .length > 0
    isReviewHighlightsInstalled =
      document.querySelectorAll('.yotpo-shoppers-say').length > 0
    isReviewsBadgeInstalled =
      document.querySelectorAll('.yotpo-badge').length > 0
    isSEOPageInstalled =
      document.querySelectorAll('#yotpo-testimonials-custom-tab').length > 0

    isStarRatingsInstalled =
      isStarRatingsV2Installed || isStarRatingsV3Installed
        ? 'Installed'
        : 'Not Installed'

    productId = isReviewsWidgetV3Installed
      ? document
          .querySelectorAll('#yotpo-reviews-main-widget')[0]
          .parentElement.getAttribute('data-yotpo-product-id')
      : isReviewsWidgetV2Installed
      ? document
          .querySelectorAll('.yotpo-main-widget')[0]
          .getAttribute('data-product-id')
      : undefined

    let v2Widgets = false
    let v3Widgets = false

    if (
      isReviewsWidgetV2Installed ||
      isStarRatingsV2Installed ||
      isReviewsCarouselInstalled ||
      isQandAButtonInstalled ||
      isReviewHighlightsInstalled ||
      isReviewsBadgeInstalled ||
      isSEOPageInstalled ||
      isQandAWidgetInstalled
    ) {
      v2Widgets = true
    }
    if (isReviewsWidgetV3Installed || isStarRatingsV3Installed) {
      v3Widgets = true
    }

    if (v2Widgets && !v3Widgets) {
      widgetRelease = 'V2'
    } else if (!v2Widgets && v3Widgets) {
      widgetRelease = 'V3'
    } else if (v2Widgets && v3Widgets) {
      widgetRelease = 'V2 & V3'
    } else {
      widgetRelease = undefined
    }

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
    isStarRatingsInstalled = undefined
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

  subscriptionsProductPageInstanceID = document.querySelector(
    '.yotpo-widget-subscriptions-add-to-cart'
  )
    ? true
    : undefined

  subscriptionsMyAccountInstanceID = document.querySelector(
    '.yotpo-widget-subscriptions-customer-portal'
  )
    ? true
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
    widgetRelease: widgetRelease,
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
    subscriptionsProductPageInstanceID: subscriptionsProductPageInstanceID,
    subscriptionsMyAccountInstanceID: subscriptionsMyAccountInstanceID,
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
