import React, { useEffect } from 'react'
import './accountsTab.css'
import AddAccount from '../addAccount/addAccount'
import Accounts from '../accounts/accounts'
import { getStoredOptions } from '../../utils/storage'
import { ActionType } from '../Redux/actionTypes'
import { useDispatch } from 'react-redux'

export default function AccountsTab() {
  let dispatch = useDispatch()

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      dispatch({ type: ActionType.SetStoredOptions, payload: storedOptions })
    })
  }, [])

  return (
    <div className="accounts yotpo-text-large yotpo-text-primary">
      <div className="data">
        <Accounts />
      </div>
      <AddAccount />
    </div>
  )
}
