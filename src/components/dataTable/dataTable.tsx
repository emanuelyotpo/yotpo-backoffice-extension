import React, { Key } from 'react'
import './dataTable.css'
import {
  YotpoAlignment,
  YotpoPriority,
  YotpoStatus,
  YotpoTableCellSize,
} from '@yotpo-common/react-b2b-components/enums'
import {
  YotpoTable,
  YotpoTableHeaderCell,
  YotpoTableCell,
  YotpoTableRow,
} from '@yotpo-common/react-b2b-components/table'
import { YotpoBadge } from '@yotpo-common/react-b2b-components/badge'
import { useSelector } from 'react-redux'
import { AppData } from '../redux/AppData'

export default function DataTable(props: { data: any }) {
  let tableColumns = Object.keys(props.data[0] || {})
  let tableRecords = props.data
  let darkMode: boolean = useSelector((state: AppData) => state.darkMode)

  return (
    <YotpoTable
      hasBorder={false}
      // className={
      //   darkMode ? 'yotpo-theme-dark-bg yotpo-theme-dark' : 'yotpo-theme-light'
      // }
    >
      {tableColumns.map((tableColumn, index) => {
        if (tableColumn === 'children') {
          return
        } else {
          return (
            <YotpoTableHeaderCell
              key={index}
              slot="columns"
              alignment={
                tableColumn === 'id' ||
                tableColumn === 'rank' ||
                tableColumn === 'type' ||
                tableColumn === 'name'
                  ? YotpoAlignment.left
                  : YotpoAlignment.center
              }
              size={
                tableColumn === 'id' || tableColumn === 'rank'
                  ? YotpoTableCellSize.tiny
                  : tableColumn === 'type' || tableColumn === 'children_modules'
                  ? YotpoTableCellSize.medium
                  : YotpoTableCellSize.small
              }
            >
              {tableColumn.replace(/_/g, ' ')}
            </YotpoTableHeaderCell>
          )
        }
      })}
      {tableRecords.map((tableRecord: any, index: Key | null | undefined) => (
        <YotpoTableRow key={index}>
          {tableColumns.map(
            (tableColumn: any, index: Key | null | undefined) => {
              if (tableColumn === 'children') {
                return
              } else {
                return (
                  <YotpoTableCell
                    className={tableColumn}
                    alignment={
                      tableColumn === 'id' ||
                      tableColumn === 'rank' ||
                      tableColumn === 'type' ||
                      tableColumn === 'name'
                        ? YotpoAlignment.left
                        : YotpoAlignment.center
                    }
                    size={
                      tableColumn === 'id' || tableColumn === 'rank'
                        ? YotpoTableCellSize.tiny
                        : tableColumn === 'type' ||
                          tableColumn === 'children_modules'
                        ? YotpoTableCellSize.medium
                        : YotpoTableCellSize.small
                    }
                  >
                    {tableRecord[tableColumn]}
                    {tableColumn === 'active' ? (
                      <YotpoBadge
                        priority={YotpoPriority.tertiary}
                        status={
                          tableRecord.active
                            ? YotpoStatus.success
                            : YotpoStatus.danger
                        }
                      >
                        {tableRecord.active ? 'Active' : 'Inactive'}
                      </YotpoBadge>
                    ) : tableColumn === 'installed' ? (
                      <YotpoBadge
                        priority={YotpoPriority.tertiary}
                        status={
                          tableRecord.installed
                            ? YotpoStatus.success
                            : YotpoStatus.danger
                        }
                      >
                        {tableRecord.installed ? 'Installed' : 'Not Installed'}
                      </YotpoBadge>
                    ) : (
                      ''
                    )}
                  </YotpoTableCell>
                )
              }
            }
          )}
        </YotpoTableRow>
      ))}
    </YotpoTable>
  )
}
