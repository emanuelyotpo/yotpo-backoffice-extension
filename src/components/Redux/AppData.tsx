import React from 'react'
import { IButton } from '../../models/IButton'
import { IData } from '../../models/IData'
import { IJS } from '../../models/IJs'
import { ITabData } from '../../models/ITabData'
import { SyncStorageOptions } from '../../utils/storage'
import LoyaltyTab from '../loyaltyTab/loyaltyTab'
import ReviewsTab from '../reviewsTab/reviewsTab'
import SMSTab from '../smsTab/smsTab'
import VMSTab from '../vmsTab/vmsTab'

export class AppData {
  // User
  isYotpoUser: boolean = false

  // Reviews
  appkey: string = ''
  productId: string = ''

  //Loyalty
  guid: string = ''
  merchantId: string = ''
  companyName: string = ''
  loyaltyPlatforms: string = ''
  customerEmail: string = ''
  customerId: string = ''
  customerTags: string = ''

  // VMS
  vmsAppkey: string = ''
  galleryId: string = ''
  vmsProductId: string = ''
  productImagesCount: number = 0

  // SMS
  userId: number
  formId: number

  // Extension Data

  siteDomain: string = ''

  options: SyncStorageOptions = {
    tabs: [],
    js: [],
  }

  tabs: ITabData[] = [
    { label: 'Reviews', value: 'reviews', i: 0, tab: <ReviewsTab /> },
    { label: 'Loyalty', value: 'loyalty', i: 1, tab: <LoyaltyTab /> },
    { label: 'VMS', value: 'vms', i: 2, tab: <VMSTab /> },
    { label: 'SMS', value: 'sms', i: 3, tab: <SMSTab /> },
  ]
  js: IJS[] = [
    { name: 'JS.do', url: 'https://js.do/', value: 'jsdo', isDefault: false },
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
  ]

  defaultJs: string = ''

  reviewsData: IData[] = [
    { key: 'App Key', value: '', id: 'appkey' },
    { key: 'Platform', value: '', id: 'platform' },
    { key: 'Stars', value: '', id: 'bottomline' },
    { key: 'Product ID', value: '', id: 'productId' },
    { key: 'Product Name', value: '', id: 'productName' },
    { key: 'Image URL', value: '', id: 'productImageURL' },
    { key: 'Average Score', value: '', id: 'avgScore' },
    { key: 'Total Reviews', value: '', id: 'totalReviews' },
    { key: 'Grouped Reviews', value: '', id: 'groupedReviews' },
    { key: 'Syndicated Reviews', value: '', id: 'syndicatedReviews' },
  ]

  loyaltyData: IData[] = [
    { key: 'GUID', value: '', id: 'guid' },
    { key: 'Merchant ID', value: '', id: 'merchantId' },
    { key: 'Platform', value: '', id: 'platformName' },
    { key: 'Customer Identification', value: '', id: 'customerIdentification' },
    { key: 'Customer Email', value: '', id: 'customerEmail' },
    { key: 'Customer ID', value: '', id: 'customerId' },
    { key: 'Customer Tags', value: '', id: 'customerTags' },
  ]

  vmsData: IData[] = [
    { key: 'App Key', value: '', id: 'vmsAppkey' },
    { key: 'Gallery ID', value: '', id: 'galleryId' },
    { key: 'Product ID', value: '', id: 'vmsProductId' },
    { key: 'Product Images', value: '', id: 'productImages' },
  ]

  smsData: IData[] = [
    { key: 'User ID', value: '', id: 'userId' },
    { key: 'Form ID', value: '', id: 'formId' },
  ]

  // Loyalty Instances, Campaigns, Redemptions & VIP tiers
  activeInstances: any[] = []
  inactiveInstances: any[] = []
  activeInstancesForCopy: any[] = []
  activeCampaigns: any[] = []
  inactiveCampaigns: any[] = []
  redemptions: any[] = []
  vipTiers: any[] = []

  // Buttons
  reviewsButtons: IButton[] = [
    {
      description: 'Test Rich Snippets',
      func: 'richSnippets',
      toolTip: 'Test Rich Snippets',
    },
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores/`,
      target: '_blank',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  loyaltyButtons: IButton[] = [
    {
      description: 'LOADER LINK',
      href: `https://cdn-widgetsrepository.yotpo.com/v1/loader/`,
      target: '_blank',
      toolTip: 'Loader Link',
    },
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores/`,
      target: '_blank',
    },
    {
      description: 'Update URLs',
      func: 'updateURLs',
      toolTip: 'Update all login & registration URLs',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  vmsButtons: IButton[] = [
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores/`,
      target: '_blank',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  smsButtons: IButton[] = [
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores/`,
      target: '_blank',
    },
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  // Copies
  reviewsCodeToCopy: string = `
    <script type="text/javascript" src="//staticw2.yotpo.com/No App Key Here/widget.js">
    </script>

    <div class="yotpo bottomLine"
        data-product-id="-----">
    </div>	
    <div class="yotpo yotpo-main-widget"
        data-product-id="-----">
    </div>`

  loyaltyCodeToCopy: string = `
      <script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/GUID" async=""></script>
      <div id="swell-customer-identification"
          data-authenticated="true"
          data-email=""
          data-id=""
          data-tags=""
          style="display:none;">
      </div>
      <div id="yotpo-loyalty-checkout-data"
          cart-subtotal-cents="-----">
      </div>
      <div id="yotpo-loyalty-cart-data">
      </div>

      <!-- Instances: -->
      <div class="yotpo-widget-instance"
            data-yotpo-instance-id="-----">
      </div>`

  vmsCodeToCopy: string = `
      <script type="text/javascript" src="//staticw2.yotpo.com/No App Key Here/widget.js">
      </script>
      <!-- Custom Gallery -->
      <div class="yotpo yotpo-pictures-widget"
        data-gallery-id="-----">
      </div>

      <!-- Product Gallery -->
      <div class="yotpo yotpo-pictures-widget"
      data-gallery-id="-----"
        data-product-id="-----">
      </div>
      `

  smsCodeToCopy: string = `
      <div>
        <script src="https://forms.smsbump.com/userId/form_formId.js"></script>
      </div>
      `
}
