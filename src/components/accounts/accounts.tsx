import React from 'react'
import './accounts.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppData } from '../Redux/AppData'
import { YotpoIconButton } from '@yotpo-common/react-b2b-components/icon-button'
import {
  YotpoAlignment,
  YotpoColor,
  YotpoPriority,
  YotpoStatus,
  YotpoTableCellSize,
} from '@yotpo-common/react-b2b-components/enums'
import { IAccount } from '../../models/IAccount'
import {
  YotpoTable,
  YotpoTableHeaderCell,
  YotpoTableCell,
  YotpoTableRow,
} from '@yotpo-common/react-b2b-components/table'
import { setStoredOptions } from '../../utils/storage'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { ActionType } from '../Redux/actionTypes'

export default function Accounts() {
  const dispatch = useDispatch()
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

  let openBackoffice = (key: string, type: string) => {
    let a = 'https://backoffice.yotpo.com/#/stores?search=' + key
    type === 'orgKey' ? (a = a + '&byOrgKey=true') : a
    window.open(a)
  }

  let removeFromAccountsList = (key: string) => {
    dispatch({
      type: ActionType.RemoveAccount,
      payload: { key: key },
    })
    setStoredOptions(options).then(() => {
      toastAlert(
        {
          alertTitle: 'Removed',
          status: YotpoStatus.success,
          icon: true,
        },
        () => {}
      )
    })
  }

  return (
    <>
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
        {tableRecords.map((account, index) => (
          <YotpoTableRow key={index} className="accounts-row">
            <YotpoTableCell
              size={YotpoTableCellSize.small}
              alignment={YotpoAlignment.left}
              onClick={() => openBackoffice(account.key, account.type)}
            >
              {account.accountName}
            </YotpoTableCell>

            <YotpoTableCell
              size={YotpoTableCellSize.stretch}
              alignment={YotpoAlignment.left}
              onClick={() => openBackoffice(account.key, account.type)}
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
      </YotpoTable>
    </>
  )
}
