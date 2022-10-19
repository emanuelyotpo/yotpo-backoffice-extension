import React from 'react'
import { YotpoProducts } from '@yotpo-common/react-b2b-components/enums'
import LoyaltyTab from '../../../components/loyaltyTab/loyaltyTab'
import ReviewsTab from '../../../components/reviewsTab/reviewsTab'
import SMSTab from '../../../components/smsTab/smsTab'
import VMSTab from '../../../components/vmsTab/vmsTab'
import { IJS } from '../../../models/IJs'
import { ITabData } from '../../../models/ITabData'
import { SyncStorageOptions } from '../../../utils/storage'
import { IAccount } from '../../../models/IAccount'
import AccountsTab from '../../../components/accountsTab/accountsTab'
import SubscriptionTab from '../../../components/subscriptionsTab/subscriptionsTab'

let tabs: ITabData[] = [
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

let js: IJS[] = [
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

export class AppData {
  tabs: ITabData[] = tabs

  js: IJS[] = js

  accounts: IAccount[] = []

  options: SyncStorageOptions = {
    tabs: tabs,
    js: js,
    accounts: []
  }
}
