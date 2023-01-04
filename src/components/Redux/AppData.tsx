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
import SubscriptionTab from '../subscriptionsTab/subscriptionsTab'
import { ICurrency } from '../../models/ICurrency'

export class AppData {
  // Reviews
  appKey: string = ''
  productId: string = ''

  //Loyalty
  guid: string = ''
  merchantId: number = undefined
  companyName: string = ''
  loyaltyPlatforms: string[] = ['']
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
  isLoggedInUserAYotpoAddress: boolean = false

  options: SyncStorageOptions = {
    tabs: [],
    js: [],
    accounts: [],
    darkMode: false,
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
      label: 'Subscriptions',
      value: 'subscriptions',
      product: YotpoProducts.subscriptions,
      tab: <SubscriptionTab />,
    },
    {
      id: 6,
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

  darkMode: boolean = false

  reviewsData: IData[] = [
    { key: 'App Key', value: '', id: 'appKey' },
    { key: 'Platform', value: '', id: 'platform' },
    { key: 'Stars Widget', value: '', id: 'isStarRatingsInstalled' },
    { key: 'Product ID', value: '', id: 'productId' },
    { key: 'Widget Release Version', value: '', id: 'widgetRelease' },
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

  subscriptionsData: IData[] = [
    { key: 'App Key', value: '', id: 'appKey' },
    { key: 'Product Handle', value: '', id: 'productHandle' },
    {
      key: 'Add To Cart Widget(product page)',
      value: '',
      id: 'subscriptionsProductPageInstanceID',
    },
    {
      key: 'My Account Widget',
      value: '',
      id: 'subscriptionsMyAccountInstanceID',
    },
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
      description: 'B2B',
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
      description: 'B2B',
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
      description: 'B2B',
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

  smsButtons: IButton[] = [
    {
      description: 'B2B',
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

  subscriptionsButtons: IButton[] = [
    {
      description: 'B2B',
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

  // Copies
  reviewsCodeToCopy: string = `
    <script type="text/javascript" src="//staticw2.yotpo.com/appKey/widget.js">
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
      <script type="text/javascript" src="//staticw2.yotpo.com/appKey/widget.js">
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

  subscriptionsCodeToCopy: string = `
    <script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/appKey" async></script>
      `

  currencies: ICurrency[] = [
    {
      value: 'ADP',
    },
    {
      value: 'AED',
    },
    {
      value: 'AFA',
    },
    {
      value: 'AFN',
    },
    {
      value: 'ALK',
    },
    {
      value: 'ALL',
    },
    {
      value: 'AMD',
    },
    {
      value: 'ANG',
    },
    {
      value: 'AOA',
    },
    {
      value: 'AOK',
    },
    {
      value: 'AON',
    },
    {
      value: 'AOR',
    },
    {
      value: 'ARA',
    },
    {
      value: 'ARP',
    },
    {
      value: 'ARS',
    },
    {
      value: 'ARY',
    },
    {
      value: 'ATS',
    },
    {
      value: 'AUD',
    },
    {
      value: 'AWG',
    },
    {
      value: 'AYM',
    },
    {
      value: 'AZM',
    },
    {
      value: 'AZN',
    },
    {
      value: 'BAD',
    },
    {
      value: 'BAM',
    },
    {
      value: 'BBD',
    },
    {
      value: 'BDT',
    },
    {
      value: 'BEC',
    },
    {
      value: 'BEF',
    },
    {
      value: 'BEL',
    },
    {
      value: 'BGJ',
    },
    {
      value: 'BGK',
    },
    {
      value: 'BGL',
    },
    {
      value: 'BGN',
    },
    {
      value: 'BHD',
    },
    {
      value: 'BIF',
    },
    {
      value: 'BMD',
    },
    {
      value: 'BND',
    },
    {
      value: 'BOB',
    },
    {
      value: 'BOP',
    },
    {
      value: 'BOV',
    },
    {
      value: 'BRB',
    },
    {
      value: 'BRC',
    },
    {
      value: 'BRE',
    },
    {
      value: 'BRL',
    },
    {
      value: 'BRN',
    },
    {
      value: 'BRR',
    },
    {
      value: 'BSD',
    },
    {
      value: 'BTN',
    },
    {
      value: 'BUK',
    },
    {
      value: 'BWP',
    },
    {
      value: 'BYB',
    },
    {
      value: 'BYN',
    },
    {
      value: 'BYR',
    },
    {
      value: 'BZD',
    },
    {
      value: 'CAD',
    },
    {
      value: 'CDF',
    },
    {
      value: 'CHC',
    },
    {
      value: 'CHE',
    },
    {
      value: 'CHF',
    },
    {
      value: 'CHW',
    },
    {
      value: 'CLF',
    },
    {
      value: 'CLP',
    },
    {
      value: 'CNY',
    },
    {
      value: 'COP',
    },
    {
      value: 'COU',
    },
    {
      value: 'CRC',
    },
    {
      value: 'CSD',
    },
    {
      value: 'CSJ',
    },
    {
      value: 'CSK',
    },
    {
      value: 'CUC',
    },
    {
      value: 'CUP',
    },
    {
      value: 'CVE',
    },
    {
      value: 'CYP',
    },
    {
      value: 'CZK',
    },
    {
      value: 'DDM',
    },
    {
      value: 'DEM',
    },
    {
      value: 'DJF',
    },
    {
      value: 'DKK',
    },
    {
      value: 'DOP',
    },
    {
      value: 'DZD',
    },
    {
      value: 'ECS',
    },
    {
      value: 'ECV',
    },
    {
      value: 'EEK',
    },
    {
      value: 'EGP',
    },
    {
      value: 'ERN',
    },
    {
      value: 'ESA',
    },
    {
      value: 'ESB',
    },
    {
      value: 'ESP',
    },
    {
      value: 'ETB',
    },
    {
      value: 'EUR',
    },
    {
      value: 'FIM',
    },
    {
      value: 'FJD',
    },
    {
      value: 'FKP',
    },
    {
      value: 'FRF',
    },
    {
      value: 'GBP',
    },
    {
      value: 'GEK',
    },
    {
      value: 'GEL',
    },
    {
      value: 'GHC',
    },
    {
      value: 'GHP',
    },
    {
      value: 'GHS',
    },
    {
      value: 'GIP',
    },
    {
      value: 'GMD',
    },
    {
      value: 'GNE',
    },
    {
      value: 'GNF',
    },
    {
      value: 'GNS',
    },
    {
      value: 'GQE',
    },
    {
      value: 'GRD',
    },
    {
      value: 'GTQ',
    },
    {
      value: 'GWE',
    },
    {
      value: 'GWP',
    },
    {
      value: 'GYD',
    },
    {
      value: 'HKD',
    },
    {
      value: 'HNL',
    },
    {
      value: 'HRD',
    },
    {
      value: 'HRK',
    },
    {
      value: 'HTG',
    },
    {
      value: 'HUF',
    },
    {
      value: 'IDR',
    },
    {
      value: 'IEP',
    },
    {
      value: 'ILP',
    },
    {
      value: 'ILR',
    },
    {
      value: 'ILS',
    },
    {
      value: 'INR',
    },
    {
      value: 'IQD',
    },
    {
      value: 'IRR',
    },
    {
      value: 'ISJ',
    },
    {
      value: 'ISK',
    },
    {
      value: 'ITL',
    },
    {
      value: 'JMD',
    },
    {
      value: 'JOD',
    },
    {
      value: 'JPY',
    },
    {
      value: 'KES',
    },
    {
      value: 'KGS',
    },
    {
      value: 'KHR',
    },
    {
      value: 'KMF',
    },
    {
      value: 'KPW',
    },
    {
      value: 'KRW',
    },
    {
      value: 'KWD',
    },
    {
      value: 'KYD',
    },
    {
      value: 'KZT',
    },
    {
      value: 'LAJ',
    },
    {
      value: 'LAK',
    },
    {
      value: 'LBP',
    },
    {
      value: 'LKR',
    },
    {
      value: 'LRD',
    },
    {
      value: 'LSL',
    },
    {
      value: 'LSM',
    },
    {
      value: 'LTL',
    },
    {
      value: 'LTT',
    },
    {
      value: 'LUC',
    },
    {
      value: 'LUF',
    },
    {
      value: 'LUL',
    },
    {
      value: 'LVL',
    },
    {
      value: 'LVR',
    },
    {
      value: 'LYD',
    },
    {
      value: 'MAD',
    },
    {
      value: 'MDL',
    },
    {
      value: 'MGA',
    },
    {
      value: 'MGF',
    },
    {
      value: 'MKD',
    },
    {
      value: 'MLF',
    },
    {
      value: 'MMK',
    },
    {
      value: 'MNT',
    },
    {
      value: 'MOP',
    },
    {
      value: 'MRO',
    },
    {
      value: 'MRU',
    },
    {
      value: 'MTL',
    },
    {
      value: 'MTP',
    },
    {
      value: 'MUR',
    },
    {
      value: 'MVQ',
    },
    {
      value: 'MVR',
    },
    {
      value: 'MWK',
    },
    {
      value: 'MXN',
    },
    {
      value: 'MXP',
    },
    {
      value: 'MXV',
    },
    {
      value: 'MYR',
    },
    {
      value: 'MZE',
    },
    {
      value: 'MZM',
    },
    {
      value: 'MZN',
    },
    {
      value: 'NAD',
    },
    {
      value: 'NGN',
    },
    {
      value: 'NIC',
    },
    {
      value: 'NIO',
    },
    {
      value: 'NLG',
    },
    {
      value: 'NOK',
    },
    {
      value: 'NPR',
    },
    {
      value: 'NZD',
    },
    {
      value: 'OMR',
    },
    {
      value: 'PAB',
    },
    {
      value: 'PEH',
    },
    {
      value: 'PEI',
    },
    {
      value: 'PEN',
    },
    {
      value: 'PES',
    },
    {
      value: 'PGK',
    },
    {
      value: 'PHP',
    },
    {
      value: 'PKR',
    },
    {
      value: 'PLN',
    },
    {
      value: 'PLZ',
    },
    {
      value: 'PTE',
    },
    {
      value: 'PYG',
    },
    {
      value: 'QAR',
    },
    {
      value: 'RHD',
    },
    {
      value: 'ROK',
    },
    {
      value: 'ROL',
    },
    {
      value: 'RON',
    },
    {
      value: 'RSD',
    },
    {
      value: 'RUB',
    },
    {
      value: 'RUR',
    },
    {
      value: 'RWF',
    },
    {
      value: 'SAR',
    },
    {
      value: 'SBD',
    },
    {
      value: 'SCR',
    },
    {
      value: 'SDD',
    },
    {
      value: 'SDG',
    },
    {
      value: 'SDP',
    },
    {
      value: 'SEK',
    },
    {
      value: 'SGD',
    },
    {
      value: 'SHP',
    },
    {
      value: 'SIT',
    },
    {
      value: 'SKK',
    },
    {
      value: 'SLL',
    },
    {
      value: 'SOS',
    },
    {
      value: 'SRD',
    },
    {
      value: 'SRG',
    },
    {
      value: 'SSP',
    },
    {
      value: 'STD',
    },
    {
      value: 'STN',
    },
    {
      value: 'SUR',
    },
    {
      value: 'SVC',
    },
    {
      value: 'SYP',
    },
    {
      value: 'SZL',
    },
    {
      value: 'THB',
    },
    {
      value: 'TJR',
    },
    {
      value: 'TJS',
    },
    {
      value: 'TMM',
    },
    {
      value: 'TMT',
    },
    {
      value: 'TND',
    },
    {
      value: 'TOP',
    },
    {
      value: 'TPE',
    },
    {
      value: 'TRL',
    },
    {
      value: 'TRY',
    },
    {
      value: 'TTD',
    },
    {
      value: 'TWD',
    },
    {
      value: 'TZS',
    },
    {
      value: 'UAH',
    },
    {
      value: 'UAK',
    },
    {
      value: 'UGS',
    },
    {
      value: 'UGW',
    },
    {
      value: 'UGX',
    },
    {
      value: 'USD',
    },
    {
      value: 'USN',
    },
    {
      value: 'USS',
    },
    {
      value: 'UYI',
    },
    {
      value: 'UYN',
    },
    {
      value: 'UYP',
    },
    {
      value: 'UYU',
    },
    {
      value: 'UYW',
    },
    {
      value: 'UZS',
    },
    {
      value: 'VEB',
    },
    {
      value: 'VEF',
    },
    {
      value: 'VES',
    },
    {
      value: 'VNC',
    },
    {
      value: 'VND',
    },
    {
      value: 'VUV',
    },
    {
      value: 'WST',
    },
    {
      value: 'XAF',
    },
    {
      value: 'XAG',
    },
    {
      value: 'XAU',
    },
    {
      value: 'XBA',
    },
    {
      value: 'XBB',
    },
    {
      value: 'XBC',
    },
    {
      value: 'XBD',
    },
    {
      value: 'XCD',
    },
    {
      value: 'XDR',
    },
    {
      value: 'XEU',
    },
    {
      value: 'XFO',
    },
    {
      value: 'XFU',
    },
    {
      value: 'XOF',
    },
    {
      value: 'XPD',
    },
    {
      value: 'XPF',
    },
    {
      value: 'XPT',
    },
    {
      value: 'XRE',
    },
    {
      value: 'XSU',
    },
    {
      value: 'XTS',
    },
    {
      value: 'XUA',
    },
    {
      value: 'XXX',
    },
    {
      value: 'YDD',
    },
    {
      value: 'YER',
    },
    {
      value: 'YUD',
    },
    {
      value: 'YUM',
    },
    {
      value: 'YUN',
    },
    {
      value: 'ZAL',
    },
    {
      value: 'ZAR',
    },
    {
      value: 'ZMK',
    },
    {
      value: 'ZMW',
    },
    {
      value: 'ZRN',
    },
    {
      value: 'ZRZ',
    },
    {
      value: 'ZWC',
    },
    {
      value: 'ZWD',
    },
    {
      value: 'ZWL',
    },
    {
      value: 'ZWN',
    },
    {
      value: 'ZWR',
    },
  ]
}
