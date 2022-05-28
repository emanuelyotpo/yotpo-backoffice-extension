import React from 'react'
import './reviewsTab.css'
import { richSnippetsResultsConnector } from '../../utils/reviewsFunctions'
import { useSelector } from 'react-redux'
import { AppData } from '../Redux/AppData'
import Buttons from '../buttons/buttons'
import DataList from '../dataList/dataList'
import { IData } from '../../models/IData'
import copyToClipboard from 'copy-to-clipboard'
import { IButton } from '../../models/IButton'

export default function ReviewsTab() {
  let appkey = useSelector((state: AppData) => state.appkey)
  let reviewsData: IData[] = useSelector((state: AppData) => state.reviewsData)


  return (
    <div className="reviews">
      <div className='data'>
      <DataList data={reviewsData} />
      </div>
      <Buttons buttons={'reviews'}></Buttons>
    </div>
  )
}
