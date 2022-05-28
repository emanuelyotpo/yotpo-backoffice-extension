import { Button, Tooltip } from '@mui/material'
import React, { Key } from 'react'
import { useSelector } from 'react-redux'
import { IButton } from '../../models/IButton'
import { AppData } from '../Redux/AppData'
import UpdateAllURLsModal from '../UpdateAllURLsModal/UpdateAllURLsModal'
import './buttons.css'
import copyToClipboard from 'copy-to-clipboard'
import { richSnippetsResultsConnector } from '../../utils/reviewsFunctions'

export default function Buttons(props: any) {
  let guid = useSelector((state: AppData) => state.guid)
  let defaultJs = useSelector((state: AppData) => state.defaultJs)
  let backofficeSerachValue: string
  let buttons: IButton[] = []
  let reviewsCodeToCopy = useSelector(
    (state: AppData) => state.reviewsCodeToCopy
  )
  let loyaltyCodeToCopy = useSelector(
    (state: AppData) => state.loyaltyCodeToCopy
  )
  let vmsCodeToCopy = useSelector((state: AppData) => state.vmsCodeToCopy)
  let smsCodeToCopy = useSelector((state: AppData) => state.smsCodeToCopy)

  if (props.buttons === 'reviews') {
    buttons = useSelector((state: AppData) => state.reviewsButtons)
    backofficeSerachValue = useSelector((state: AppData) => state.appkey)
  }
  if (props.buttons === 'loyalty') {
    buttons = useSelector((state: AppData) => state.loyaltyButtons)
    backofficeSerachValue = useSelector((state: AppData) => state.companyName) + guid
  }
  if (props.buttons === 'vms') {
    buttons = useSelector((state: AppData) => state.vmsButtons)
    backofficeSerachValue = useSelector((state: AppData) => state.vmsAppkey)
  }
  if (props.buttons === 'sms') {
    buttons = useSelector((state: AppData) => state.smsButtons)
    backofficeSerachValue = useSelector((state: AppData) => state.siteDomain)
  }

  return (
    <div className="buttons">
      {buttons.map(
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
            {button.func === 'updateURLs' ? (
              <Tooltip title={button.toolTip}>
                <UpdateAllURLsModal />
              </Tooltip>
            ) : (
              <Tooltip title={button.toolTip}>
                <Button
                  key={index}
                  variant="outlined"
                  className="btn action"
                  onClick={() => {
                    props.buttons === 'reviews' &&
                    button.func === 'richSnippets'
                      ? richSnippetsResultsConnector()
                      : props.buttons === 'reviews' &&
                        button.func === 'inspectClean'
                      ? copyToClipboard(reviewsCodeToCopy)
                      : props.buttons === 'loyalty' &&
                        button.func === 'inspectClean'
                      ? copyToClipboard(loyaltyCodeToCopy)
                      : props.buttons === 'vms' &&
                        button.func === 'inspectClean'
                      ? copyToClipboard(vmsCodeToCopy)
                      : props.buttons === 'sms' &&
                        button.func === 'inspectClean'
                      ? copyToClipboard(smsCodeToCopy)
                      : undefined
                  }}
                  href={
                    button.func === 'inspectClean'
                      ? defaultJs
                      : button.func === 'backoffice'
                      ? button.href + backofficeSerachValue
                      : button.href
                  }
                  target={button.target}
                >
                  {button.description}
                </Button>
              </Tooltip>
            )}
          </>
        )
      )}
    </div>
  )
}
