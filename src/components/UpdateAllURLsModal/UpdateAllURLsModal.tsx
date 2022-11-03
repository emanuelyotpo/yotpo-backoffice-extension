import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editAllLoyaltyInstanceStaticContent } from '../../utils/loyaltyFunctions'
import { AppData } from '../redux/AppData'
import './UpdateAllURLsModal.css'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import {
  YotpoDirection,
  YotpoInputType,
  YotpoPriority,
  YotpoStatus,
} from '@yotpo-common/react-b2b-components/enums'
import { ActionType } from '../redux/actionTypes'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'

export default function UpdateAllURLsModal() {
  let dispatch = useDispatch()
  let guid = useSelector((state: AppData) => state.guid)
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  const handleModalHide = (event: any) => {
    dispatch({
      type: ActionType.SetIsUpdateAllURLsModalOpen,
    })
    setModalOpen(false)
  }

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
      editAllLoyaltyInstanceStaticContent(guid, loginURL, registrationURL)
      handleModalHide('')
      toastAlert(
        {
          alertTitle: `Saved`,
          status: YotpoStatus.success,
          icon: true,
        },
        () => {}
      )
    } catch (error) {
      toastAlert(
        {
          alertTitle: `${error}`,
          status: YotpoStatus.danger,
          icon: true,
        },
        () => {}
      )
    }
  }

  return (
    <>
      <YotpoTooltip
        text="Update All Login & Registration URLs"
        tooltipPlacement={YotpoDirection.top}
        visibilityEnabled={!modalOpen}
      >
        <YotpoButton priority={YotpoPriority.primary} onClick={handleOpen}>
          Edit URLs
        </YotpoButton>
      </YotpoTooltip>
      <YotpoModal
        open={modalOpen}
        modalTitle="Update Login & Registration URLs"
        onYotpoHide={(event: Event) => handleModalHide(event)}
        onYotpoMainAction={(event: Event) => handleSave(event)}
        onYotpoSecondaryAction={(event: Event) => handleModalHide(event)}
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
