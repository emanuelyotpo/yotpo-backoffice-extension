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

export class OptionsAppData {
  tabs: ITabData[] = [
    {
      id: 1,
      label: 'Reviews',
      value: 'reviews',
      product: YotpoProducts.reviews,
      tab: <ReviewsTab />,
      visible: true
    },
    {
      id: 2,
      label: 'Loyalty',
      value: 'loyalty',
      product: YotpoProducts.loyalty,
      tab: <LoyaltyTab />,
      visible: true
    },
    {
      id: 3,
      label: 'VMS',
      value: 'vms',
      product: YotpoProducts.vugc,
      tab: <VMSTab />,
      visible: true
    },
    {
      id: 4,
      label: 'SMS',
      value: 'sms',
      product: YotpoProducts.smsbump,
      tab: <SMSTab />,
      visible: true
    },
    {
      id: 5,
      label: 'Subscriptions',
      value: 'subscriptions',
      product: YotpoProducts.subscriptions,
      tab: <SubscriptionTab />,
      visible: true
    },
    {
      id: 6,
      label: 'Accounts',
      value: 'accounts',
      tab: <AccountsTab />,
      visible: true
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

  darkMode: boolean = false

  options: SyncStorageOptions = {
    tabs: this.tabs,
    js: this.js,
    accounts: this.accounts,
    darkMode: this.darkMode,
  }
}
