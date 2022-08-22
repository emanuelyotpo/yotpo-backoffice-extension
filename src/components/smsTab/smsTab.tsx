import React from 'react'
import { useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { IData } from '../../models/IData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { AppData } from '../Redux/AppData'
import './smsTab.css'

export default function SMSTab() {
  let smsData: IData[] = useSelector((state: AppData) => state.smsData)
  let buttons: IButton[] = useSelector((state: AppData) => state.smsButtons)
  let codeToCopy: string = useSelector((state: AppData) => state.smsCodeToCopy)

  
  return (
    <div className="sms yotpo-text-large yotpo-text-primary">
      <div className="data">
      <DataList data={smsData} />
      </div>
      <Buttons buttons={buttons} codeToCopy={codeToCopy}></Buttons>
    </div>
  )
}
