import React from 'react'
import { useSelector } from 'react-redux'
import { IData } from '../../models/IData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { AppData } from '../Redux/AppData'
import './vmsTab.css'

export default function VMSTab() {
  let vmsAppkey = useSelector((state: AppData) => state.vmsAppkey)
  let vmsData: IData[] = useSelector((state: AppData) => state.vmsData)

  return (
    <div className="vms">
      <div className="data">
        <DataList data={vmsData} />
      </div>
      <Buttons buttons={'vms'}></Buttons>
    </div>
  )
}
