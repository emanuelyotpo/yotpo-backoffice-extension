import React, { useState } from 'react'
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
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  let handleClose = () => setModalOpen(false)

  const handleUrlChange = (event: any) => {
    if (!event.target.value) {
      return
    } else if (event.target.name === 'login') {
      setLoginURL(event.target.value)
    } else if (event.target.name === 'register') {
      setRegistrationURL(event.target.value)
    }
  }

  let handleSave = (event: any) => {
    try {
      editAllLoyaltyInstanceLoginAndRegistrationURLs(
        guid,
        loginURL,
        registrationURL
      )
      handleClose()
      toast('success', 'Saved') 
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
        className="yotpo-theme-light"
        open={modalOpen}
        modalTitle="Update Login & Registration URLs"
        onYotpoHide={handleClose}
        onYotpoMainAction={(event: Event) => handleSave(event)}
        onYotpoSecondaryAction={handleClose}
      >
        <YotpoInput
          type={YotpoInputType.text}
          clearable={true}
          required={true}
          label="Login URL"
          name="login"
          onYotpoChange={(event: Event) => handleUrlChange(event)}
        ></YotpoInput>
        <br />
        <YotpoInput
          type={YotpoInputType.text}
          clearable={true}
          required={true}
          label="Registration URL"
          name="register"
          onYotpoChange={(event: Event) => handleUrlChange(event)}
        ></YotpoInput>
      </YotpoModal>
    </>
  )
}
