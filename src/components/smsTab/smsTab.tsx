import React from 'react'
import { useSelector } from 'react-redux'
import { IData } from '../../models/IData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { AppData } from '../Redux/AppData'
import useCopy from '../useCopy/useCopy'
import './smsTab.css'

export default function SMSTab() {
  let userId = useSelector((state: AppData) => state.userId)
  let formId = useSelector((state: AppData) => state.formId)
  let smsData: IData[] = useSelector((state: AppData) => state.smsData)

  const [copied, copy, setCopied] = useCopy(`
    <div>
        <script src="https://forms.smsbump.com/${userId}/form_${formId}.js"></script>
    </div>
  `)
    
  const copyText = () => {
    copy()
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  let smsButtons = [
    {
      description: 'INSPECT IN CLEAN ENVIRONMENT',
      func: copyText,
      href: `https://js.do/`,
      target: '_blank',
      toolTip:
        'Press CTRL+V or CMD+V to paste the relevant code once the new tab is opened.',
    },
  ]
  return (
    <div className="sms">
      <DataList data={smsData} />
      <Buttons buttons={'sms'}></Buttons>
    </div>
  )
}
