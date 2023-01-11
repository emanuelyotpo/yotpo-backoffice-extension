import React, { Key, memo } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import './tabCard.css'
import {
  YotpoSize,
  YotpoProductLogoBackGroundColor,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoIcon } from '@yotpo-common/react-b2b-components/icon'
import { YotpoProductLogo } from '@yotpo-common/react-b2b-components/product-logo'
import { ITabData } from '../../../models/ITabData'

export default function TabCard({ tab, index}) {
    if (tab.value === 'accounts') {
        return (
          <div key={tab.id}>
            <div className="large-product-logo gray-bg">
              <div className="icon-container">
                <div className="product-icon">
                  <YotpoIcon name="account"></YotpoIcon>
                </div>
              </div>
              <div className="product-label">{tab.label}</div>
            </div>
          </div>
        )
      } else {
        return (
          <div key={tab.id}>
            <YotpoProductLogo
              productName={tab.product}
              size={YotpoSize.large}
              bgColor={YotpoProductLogoBackGroundColor.gray}
              showProductName={true}
            ></YotpoProductLogo>
          </div>
        )
      }
  
}
