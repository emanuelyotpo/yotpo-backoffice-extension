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
import UpdateAllURLsModal from '../UpdateAllURLsModal/UpdateAllURLsModal'

export default function Buttons(props: {
  buttons: IButton[]
  codeToCopy: string
  redirectUri: string
}) {
  let isUpdateAllURLsModalOpen = useSelector(
    (state: AppData) => state.isUpdateAllURLsModalOpen
  )
  let guid = useSelector((state: AppData) => state.guid)
  let appKey = useSelector((state: AppData) => state.appKey)
  let siteDomain = useSelector((state: AppData) => state.siteDomain)
  let redirectUri = props.redirectUri
  let defaultJs = useSelector((state: AppData) => state.defaultJs)

  let backofficeUrl: string = appKey
    ? `https://backoffice.yotpo.com/#/stores/${appKey}/login?redirectUri=${redirectUri}`
    : `https://backoffice.yotpo.com/#/stores?search=${siteDomain}`

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
        ) => {
          if (button.func === 'updateURLs') {
            return <UpdateAllURLsModal />
          } else {
            return (
              <>
                <YotpoTooltip
                  text={button.toolTip}
                  visibilityEnabled={!isUpdateAllURLsModalOpen}
                >
                  <YotpoButton
                    key={index}
                    onClick={() => {
                      button.func === 'richSnippets'
                        ? richSnippetsResultsConnector()
                        : button.func === 'inspectClean'
                        ? (copyToClipboard(props.codeToCopy),
                          window.open(defaultJs, '_blank'))
                        : button.func === 'backoffice'
                        ? window.open(backofficeUrl, '_blank')
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
          }
        }
      )}
    </div>
  )
}
