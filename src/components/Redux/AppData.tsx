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
import { YotpoProducts } from '@yotpo-common/react-b2b-components/enums'
import { ICustomQuestion } from '../../models/ICustomQuestion'
import { IAccount } from '../../models/IAccount'
import AccountsTab from '../accountsTab/accountsTab'
export class AppData {
  // Reviews
  appKey: string = ''
  productId: string = ''

  //Loyalty
  guid: string = ''
  merchantId: number = undefined
  companyName: string = ''
  loyaltyPlatforms: string = ''
  customerEmail: string = ''
  customerId: string = ''
  customerTags: string = ''

  // VMS
  galleryId: string = ''
  vmsProductId: string = ''
  productImagesCount: number = 0

  // SMS
  userId: number
  formId: number

  // Extension Data
  siteDomain: string = ''
  siteHref: string = ''
  isUpdateAllURLsModalOpen: boolean = false

  options: SyncStorageOptions = {
    tabs: [],
    js: [],
    accounts: [],
  }

  tabs: ITabData[] = [
    {
      id: 1,
      label: 'Reviews',
      value: 'reviews',
      product: YotpoProducts.reviews,
      tab: <ReviewsTab />,
    },
    {
      id: 2,
      label: 'Loyalty',
      value: 'loyalty',
      product: YotpoProducts.loyalty,
      tab: <LoyaltyTab />,
    },
    {
      id: 3,
      label: 'VMS',
      value: 'vms',
      product: YotpoProducts.vugc,
      tab: <VMSTab />,
    },
    {
      id: 4,
      label: 'SMS',
      value: 'sms',
      product: YotpoProducts.smsbump,
      tab: <SMSTab />,
    },
    {
      id: 5,
      label: 'Accounts',
      value: 'accounts',
      tab: <AccountsTab />,
    },
  ]
  js: IJS[] = [
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
  ]

  accounts: IAccount[] = []

  defaultJs: string = ''

  reviewsData: IData[] = [
    { key: 'App Key', value: '', id: 'appKey' },
    { key: 'Platform', value: '', id: 'platform' },
    { key: 'Stars Widget', value: '', id: 'isStarRatingsInstalled' },
    { key: 'Product ID', value: '', id: 'productId' },
    { key: 'Widget Version', value: '', id: 'reviewsWidgetVersion' },
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
    {
      key: 'Customer Identification',
      value: '',
      id: 'isCustomerIdentificationInstalled',
    },
    { key: 'Customer Email', value: '', id: 'customerEmail' },
    { key: 'Customer ID', value: '', id: 'customerId' },
    { key: 'Customer Tags', value: '', id: 'customerTags' },
  ]

  vmsData: IData[] = [
    { key: 'App Key', value: '', id: 'appKey' },
    { key: 'Product Gallery ID', value: '', id: 'productGalleryId' },
    { key: 'Product ID', value: '', id: 'vmsProductId' },
    { key: 'Product Images', value: '', id: 'productImages' },
    { key: 'Custom Gallery IDs', value: '', id: 'customGalleryIds' },
  ]

  smsData: IData[] = [
    { key: 'User ID', value: '', id: 'userId' },
    { key: 'Form ID', value: '', id: 'formId' },
    { key: 'Shopify URL', value: '', id: 'myShopifyUrl' },
  ]

  accountsData: IData[] = []

  // Reviews Custom Fields Aggregation
  customFieldsAggregation: ICustomQuestion[] = []

  // Loyalty Instances, Campaigns, Redemptions & VIP tiers
  activeInstances: object = {}
  childActiveInstances: object = {}
  inactiveInstances: object = {}
  installedInstances: Set<any> = new Set()
  activeInstancesForCopy: any[] = []
  instances: object = {}
  campaigns: any[] = []
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
      description: 'Inspect In Clean Environment',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]

  loyaltyButtons: IButton[] = [
    {
      description: 'Loader Link',
      func: 'loader',
      href: `https://cdn-widgetsrepository.yotpo.com/v1/loader/`,
      target: '_blank',
      toolTip: 'Loader Link',
    },
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores?search=`,
      target: '_blank',
    },
    {
      description: 'Inspect In Clean Environment',
      func: 'inspectClean',
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
    {
      description: 'Edit URLs',
      func: 'updateURLs',
      toolTip: 'Update all login & registration URLs',
    },
    // {
    //   description: 'Calculate Data Imports',
    //   func: 'calculateData',
    //   href: `https://yotpo-stool.s3.amazonaws.com/Solution-Engineers/data_import_calculator/index.html`,
    //   target: '_blank',
    //   toolTip: 'Calculate when you should start importing data.',
    // },
  ]

  vmsButtons: IButton[] = [
    {
      description: 'Backoffice',
      func: 'backoffice',
      toolTip: 'Open in Backoffice',
      href: `https://backoffice.yotpo.com/#/stores?search=`,
      target: '_blank',
    },
    {
      description: 'Inspect In Clean Environment',
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
      href: `https://backoffice.yotpo.com/#/stores?search=`,
      target: '_blank',
    },
    {
      description: 'Inspect In Clean Environment',
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
