import React, { useEffect } from 'react'
import {
  YotpoTableCellSize,
  YotpoAlignment,
  YotpoColor,
  YotpoPriority,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoIconButton } from '@yotpo-common/react-b2b-components/icon-button'
import {
  YotpoTable,
  YotpoTableHeaderCell,
  YotpoTableRow,
  YotpoTableCell,
} from '@yotpo-common/react-b2b-components/table'
import { useSelector, useDispatch } from 'react-redux'
import { IAccount } from '../../models/IAccount'
import { setStoredOptions, getStoredOptions } from '../../utils/storage'
import AddAccount from '../addAccount/addAccount'
import { ActionType } from '../redux/actionTypes'
import { AppData } from '../redux/AppData'
import './accountsTab.css'
import { toast } from '../../utils/generalFunctions'

export default function AccountsTab() {
  let options = useSelector((state: AppData) => state.options)
  let tableColumns = ['Name', 'Key', 'Delete']
  let tableRecords: IAccount[] = useSelector(
    (state: AppData) => state.options.accounts
  )

  tableRecords.sort(function (a, b) {
    var textA = a.accountName.toUpperCase()
    var textB = b.accountName.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  })

  let dispatch = useDispatch()

  let openBackoffice = (key: string, type: string) => {
    let a = 'https://backoffice.yotpo.com/#/stores?search=' + key
    type === 'orgKey' ? (a = a + '&byOrgKey=true') : a
    window.open(a)
  }

  let removeFromAccountsList = (key: string) => {
    dispatch({
      type: ActionType.RemoveAccountFromList,
      payload: { key: key },
    })
    setStoredOptions(options).then(() => {
      toast('success', 'Removed') 
    })
  }

  useEffect(() => {
    getStoredOptions().then((options) => {
      if (options) {
        dispatch({ type: ActionType.SetStoredOptions, payload: options })
      }
    })
  }, [])

  return (
    <div className="tab-content yotpo-text-large yotpo-text-primary">
      <div className="data">
        <YotpoTable hasBorder={false}>
          {tableColumns.map((tableColumn, index) => (
            <YotpoTableHeaderCell
              key={index}
              slot="columns"
              size={
                tableColumn === 'Name'
                  ? YotpoTableCellSize.small
                  : tableColumn === 'Delete'
                  ? YotpoTableCellSize.tiny
                  : YotpoTableCellSize.stretch
              }
              alignment={
                tableColumn === 'Delete'
                  ? YotpoAlignment.right
                  : YotpoAlignment.left
              }
            >
              {tableColumn.toUpperCase().replace(/_/g, ' ')}
            </YotpoTableHeaderCell>
          ))}
          {tableRecords.length > 0 ? (
            <>
              {tableRecords.map((account, index) => (
                <YotpoTableRow key={index} className="accounts-row">
                  <YotpoTableCell
                    size={YotpoTableCellSize.small}
                    alignment={YotpoAlignment.left}
                    onClick={() => openBackoffice(account.key, account.type)}
                    className="account on click"
                  >
                    {account.accountName}
                  </YotpoTableCell>

                  <YotpoTableCell
                    size={YotpoTableCellSize.stretch}
                    alignment={YotpoAlignment.left}
                    onClick={() => openBackoffice(account.key, account.type)}
                    className="account on click"
                  >
                    {account.key}
                  </YotpoTableCell>
                  <YotpoTableCell
                    size={YotpoTableCellSize.tiny}
                    alignment={YotpoAlignment.center}
                  >
                    <YotpoIconButton
                      color={YotpoColor.destructive}
                      priority={YotpoPriority.tertiary}
                      name="close"
                      tooltipText="Delete"
                      onClick={() => removeFromAccountsList(account.key)}
                    ></YotpoIconButton>
                  </YotpoTableCell>
                </YotpoTableRow>
              ))}
            </>
          ) : (
            <YotpoTableRow className="accounts-row">
              <YotpoTableCell
                size={YotpoTableCellSize.stretch}
                alignment={YotpoAlignment.center}
              >
                No customers on this list
              </YotpoTableCell>
            </YotpoTableRow>
          )}
        </YotpoTable>
      </div>
      <AddAccount />
    </div>
  )
}
