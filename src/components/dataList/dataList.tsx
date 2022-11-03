import React, { Key, useEffect } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import './dataList.css'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import {
  YotpoDirection,
  YotpoStatus,
} from '@yotpo-common/react-b2b-components/enums'
import SearchableComponenet from '../searchableComponent/searchableComponent'
import { YotpoIcon } from '@yotpo-common/react-b2b-components/icon'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'

export default function DataList(props: any) {
  function copiedSuccessfully() {
    toastAlert(
      {
        alertTitle: 'Copied',
        status: YotpoStatus.success,
        icon: true,
      },
      () => {}
    )
  }

  let linkRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  useEffect(() => {}, [props.data])
  return (
    <>
      <div>
        {props.data.map(
          (
            data: {
              key: string
              value: string
              id: string
            },
            index: Key | null | undefined
          ) => {
            return (
              <div
                id={data.id}
                key={index}
                className="yotpo-text-large yotpo-text-secondary entry-name"
              >
                {`${data.key}:\u00A0`}
                {data.id !== 'appKey' &&
                data.id !== 'productId' &&
                data.id !== 'guid' ? (
                  <span className="yotpo-text-large yotpo-text-primary yotpo-text-bold entry-data">
                    {!data.value ? (
                      'N/A'
                    ) : linkRegex.exec(data.value) ? (
                      <a target="_blank" href={data.value}>
                        Link
                      </a>
                    ) : (
                      data.value
                    )}
                  </span>
                ) : (
                  <SearchableComponenet data={data}></SearchableComponenet>
                )}
                <YotpoTooltip text="Copy" tooltipPlacement={YotpoDirection.top}>
                  <YotpoIcon
                    name="duplicate"
                    onClick={() => {
                      copyToClipboard(data.value), copiedSuccessfully()
                    }}
                  ></YotpoIcon>
                </YotpoTooltip>
              </div>
            )
          }
        )}
      </div>
    </>
  )
}
