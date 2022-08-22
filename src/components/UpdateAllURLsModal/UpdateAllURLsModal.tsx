import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editAllLoyaltyInstanceStaticContent } from '../../utils/loyaltyFunctions'
import { AppData } from '../Redux/AppData'
import './UpdateAllURLsModal.css'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import {
  YotpoInputType,
  YotpoStatus,
} from '@yotpo-common/react-b2b-components/enums'
import { ActionType } from '../Redux/actionTypes'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'

export default function UpdateAllURLsModal() {
  let dispatch = useDispatch()
  let guid = useSelector((state: AppData) => state.guid)
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  let isUpdateAllURLsModalOpen = useSelector(
    (state: AppData) => state.isUpdateAllURLsModalOpen
  )

  const handleModalHide = () => {
    dispatch({
      type: ActionType.SetIsUpdateAllURLsModalOpen,
    })
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

  let handleSave = () => {
    try {
      editAllLoyaltyInstanceStaticContent(guid, loginURL, registrationURL)
      handleModalHide()
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
      <YotpoModal
        open={isUpdateAllURLsModalOpen}
        modalTitle="Update Login & Registration URLs"
        onYotpoHide={(event: Event) => handleModalHide}
        onYotpoMainAction={(event: Event) => handleSave()}
        onYotpoSecondaryAction={(event: Event) => handleModalHide()}
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
