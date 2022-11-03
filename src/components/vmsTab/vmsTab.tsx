import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoStatus } from '@yotpo-common/react-b2b-components/enums'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { IData } from '../../models/IData'
import { fetchVMSData } from '../../utils/api'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { ActionType } from '../redux/actionTypes'
import { AppData } from '../redux/AppData'
import './vmsTab.css'

export default function VMSTab() {
  let appKey = useSelector((state: AppData) => state.appKey)
  let vmsProductId = useSelector((state: AppData) => state.vmsProductId)
  let vmsData: IData[] = useSelector((state: AppData) => state.vmsData)
  let buttons: IButton[] = useSelector((state: AppData) => state.vmsButtons)
  let codeToCopy: string = useSelector((state: AppData) => state.vmsCodeToCopy)

  const dispatch = useDispatch()

  let setVmsData = () => {
    if (appKey && vmsProductId) {
      fetchVMSData(appKey, vmsProductId)
        .then((data) => {
          dispatch({
            type: ActionType.SetVMSData,
            payload: {
              productImages: data.response.pagination.total,
            },
          })
        })
        .catch((error: any) => 
        toastAlert(
          {
              alertTitle: `${error}`,
              status: YotpoStatus.warning,
              icon: true
          },
          () => {})
          )
    }
  }

  useEffect(() => {
    setVmsData()
  }, [appKey, vmsProductId])

  return (
    <div className="vms">
      <div className="data">
        <DataList data={vmsData} />
      </div>
      <Buttons buttons={buttons} codeToCopy={codeToCopy} redirectUri={'https://visual.yotpo.com/'}></Buttons>
    </div>
  )
}
