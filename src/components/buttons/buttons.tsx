import React, { Key } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { AppData } from '../Redux/AppData'
import './buttons.css'
import copyToClipboard from 'copy-to-clipboard'
import { richSnippetsResultsConnector } from '../../utils/reviewsFunctions'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import { ActionType } from '../Redux/actionTypes'

export default function Buttons(props: {
  buttons: IButton[]
  codeToCopy: string
}) {
  let dispatch = useDispatch()
  let isUpdateAllURLsModalOpen = useSelector(
    (state: AppData) => state.isUpdateAllURLsModalOpen
  )
  let guid = useSelector((state: AppData) => state.guid)
  let defaultJs = useSelector((state: AppData) => state.defaultJs)

  let backofficeSerachValue: string = useSelector(
    (state: AppData) => state.appKey
  )
    ? useSelector((state: AppData) => state.appKey)
    : useSelector((state: AppData) => state.siteDomain)

  let backofficeUrl: string = useSelector((state: AppData) => state.appKey)
    ? `https://backoffice.yotpo.com/#/stores/`
    : `https://backoffice.yotpo.com/#/stores?search=`

  let openURLsModal = () => {
    dispatch({
      type: ActionType.SetIsUpdateAllURLsModalOpen,
    })
  }

  return (
    <div className="buttons">
      {props.buttons.map(
        (
          button: {
            description: string
            func?: any
            href?: string
            target?: string
            toolTip: string
          },
          index: Key | null | undefined
        ) => (
          <>
            <YotpoTooltip
              text={button.toolTip}
              visibilityEnabled={!isUpdateAllURLsModalOpen}
            >
              <YotpoButton
                key={index}
                onClick={() => {
                  button.func === 'updateURLs'
                    ? openURLsModal()
                    : button.func === 'richSnippets'
                    ? richSnippetsResultsConnector()
                    : button.func === 'inspectClean'
                    ? (copyToClipboard(props.codeToCopy),
                      window.open(defaultJs, '_blank'))
                    : button.func === 'backoffice'
                    ? window.open(
                        backofficeUrl + backofficeSerachValue,
                        '_blank'
                      )
                    : button.func === 'loader'
                    ? window.open(button.href + guid, '_blank')
                    : window.open(button.href, '_blank')
                }}
              >
                {button.description}
              </YotpoButton>
            </YotpoTooltip>
          </>
        )
      )}
    </div>
  )
}
