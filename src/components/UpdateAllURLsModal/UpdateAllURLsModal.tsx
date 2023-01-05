import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { editAllLoyaltyInstanceLoginAndRegistrationURLs } from '../../utils/loyaltyFunctions'
import { AppData } from '../redux/AppData'
import './UpdateAllURLsModal.css'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import {
  YotpoInputType,
  YotpoPriority,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import '@yotpo-common/react-b2b-components/themes/theme.css'
import { toast } from '../../utils/generalFunctions'

export default function UpdateAllURLsModal() {
  let guid = useSelector((state: AppData) => state.guid)
  let darkMode: boolean = useSelector((state: AppData) => state.darkMode)
  let loyaltyPlatforms: string[] = useSelector(
    (state: AppData) => state.loyaltyPlatforms
  )
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  let [baseURL, setBaseURL] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  let handleClose = () => setModalOpen(false)

  const handleUrlChange = (event: any) => {
    if (event.target.name === 'login') {
      setLoginURL(event.target.value)
    } else if (event.target.name === 'register') {
      setRegistrationURL(event.target.value)
    } else if (event.target.name === 'base') {
      setBaseURL(event.target.value)
    }
  }

  let handleSave = (event: any) => {
    try {
      editAllLoyaltyInstanceLoginAndRegistrationURLs(
        guid,
        loginURL,
        registrationURL,
        baseURL
      )
      handleClose()
      toast('success', "Saving, please don't close this dialog")
    } catch (error) {
      toast('danger', error)
    }
  }

  return (
    <>
      <YotpoButton priority={YotpoPriority.primary} onClick={handleOpen}>
        Update URLs
      </YotpoButton>
      <YotpoModal
        className={'yotpo-theme-light'}
        // className={
        //   'layout' + darkMode
        //     ? 'yotpo-theme-dark-bg yotpo-theme-dark'
        //     : 'yotpo-theme-light'
        // }
        open={modalOpen}
        modalTitle={'Update URLs'}
        onYotpoHide={handleClose}
        onYotpoMainAction={(event: Event) => handleSave(event)}
        onYotpoSecondaryAction={handleClose}
        mainActionDisabled={
          !loginURL.length && !registrationURL.length && !baseURL.length
        }
      >
        <YotpoInput
          type={YotpoInputType.text}
          clearable={true}
          label="Login URL"
          name="login"
          onYotpoChange={(event: Event) => handleUrlChange(event)}
        ></YotpoInput>
        <br />
        <YotpoInput
          type={YotpoInputType.text}
          clearable={true}
          label="Registration URL"
          name="register"
          onYotpoChange={(event: Event) => handleUrlChange(event)}
        ></YotpoInput>
        {loyaltyPlatforms.includes('magento2') && (
          <>
            <br />
            <YotpoInput
              type={YotpoInputType.url}
              clearable={true}
              label="Base URL"
              name="base"
              pattern={'.+(?=/rest/V1$).+'}
              errorText={'Invalid format'}
              onYotpoChange={(event: any) => handleUrlChange(event)}
            ></YotpoInput>
          </>
        )}
      </YotpoModal>
    </>
  )
}
