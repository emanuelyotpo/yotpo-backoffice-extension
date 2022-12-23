import React, { Key, useEffect, useMemo, useState } from 'react'
import './ReorderTabs.css'
import { ITabData } from '../../../models/ITabData'
import { useDispatch, useSelector } from 'react-redux'
import { OptionsActionType } from '../Redux/optionsActionTypes'
import {
  YotpoSize,
  YotpoProductLogoBackGroundColor,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoProductLogo } from '@yotpo-common/react-b2b-components/product-logo'
import { Draggable } from 'react-drag-reorder'
import { OptionsAppData } from '../Redux/OptionsAppData'

export default function ReorderTabs(props: { tabs: ITabData[] }) {
  const dispatch = useDispatch()
  let tabs: ITabData[] = useSelector((state: OptionsAppData) => state.options.tabs)

  let handleTabsChange = (currentPos: any, newPos: any) => {
    dispatch({
      type: OptionsActionType.SetTabsOrder,
      payload: { newIndex: newPos, oldIndex: currentPos },
    })
  }

  useEffect(() => {
  }, [tabs])

  return (
    <>
      <h3>Tabs Order</h3>
      <label>Drag & Drop</label>
      <div className="draggble-container">
        <Draggable
          onPosChange={(currentPos: any, newPos: any) =>
            handleTabsChange(currentPos, newPos)
          }
        >
          {tabs.map((tab: ITabData, index: Key | undefined | null) => {
            if (!tab.product) {
              return
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
          })}
        </Draggable>
      </div>
    </>
  )
}
