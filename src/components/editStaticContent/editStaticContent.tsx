import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  editSingleLoyaltyInstanceStaticContent,
  fetchSingleLoyaltyInstanceData,
} from '../../utils/api'
import { AppData } from '../redux/AppData'
import './editStaticContent.css'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import {
  YotpoDirection,
  YotpoInputType,
  YotpoPriority,
  YotpoStatus,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import { YotpoIcon } from '@yotpo-common/react-b2b-components/icon'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'

export default function EditStaticContent(props: any) {
  let guid = useSelector((state: AppData) => state.guid)
  let [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  let handleClose = () => setModalOpen(false)
  let [toggle, setToggle] = useState(true)
  let toggleInput = () => {
    setToggle(false)
  }
  let [staticContent, setStaticContent] = useState({})

  function handleChange(key: any, event: any) {
    if (!event.target.value) {
      return
    }
    staticContent[key] = event.target.value.toLowerCase()
  }

  let handleSave = () => {
    try {
      editSingleLoyaltyInstanceStaticContent(
        props.instance.guid,
        props.instance.id,
        staticContent
      ).then((response) => {
        setToggle(false)
        handleClose()
        toastAlert(
          {
            alertTitle: 'Saved',
            status: YotpoStatus.success,
            icon: true,
          },
          () => {}
        )
      })
    } catch (error) {
      toastAlert(
        {
          alertTitle: `${error}`,
          status: YotpoStatus.success,
          icon: true,
        },
        () => {}
      )
    }
  }

  const setLoyaltyInstanceStaticContent = () => {
    fetchSingleLoyaltyInstanceData(guid, props.instance.id)
      .then((response) => {
        setStaticContent(response.instance.static_content)
      })
      .catch((error: any) =>
        toastAlert(
          {
            alertTitle: `${error}`,
            status: YotpoStatus.success,
            icon: true,
          },
          () => {}
        )
      )
  }

  useEffect(() => {
    setLoyaltyInstanceStaticContent()
  }, [])

  return (
    <>
      <YotpoButton priority={YotpoPriority.tertiary} onClick={handleOpen}>
        VIEW/EDIT
      </YotpoButton>
      <YotpoModal
        open={modalOpen}
        modalTitle={`Static Content for ${props.instance.id}`}
        onYotpoHide={handleClose}
        onYotpoMainAction={handleSave}
        onYotpoSecondaryAction={handleClose}
      >
        {Object.keys(staticContent).map((key, i) => (
          <p key={i}>
            <span>{key}:&nbsp;</span>
            {key === 'storeAccountLoginUrl' ||
            key === 'storeAccountRegistrationUrl' ||
            key === 'storeLoginUrl' ||
            key === 'storeRegistrationUrl' ||
            key === 'platformName' ||
            key === 'baseUrl' ? (
              <>
                {toggle ? (
                  <>
                    <span>{staticContent[key]}</span>
                    <YotpoTooltip
                      text="Edit"
                      tooltipPlacement={YotpoDirection.top}
                    >
                      <YotpoIcon
                        name="edit"
                        onClick={() => toggleInput()}
                      ></YotpoIcon>
                    </YotpoTooltip>
                  </>
                ) : (
                  <YotpoInput
                    type={YotpoInputType.text}
                    clearable={true}
                    required={true}
                    value={staticContent[key]}
                    placeholder={staticContent[key]}
                    onYotpoChange={(event: Event) => handleChange(key, event)}
                  />
                )}
              </>
            ) : (
              <span>{staticContent[key]}</span>
            )}
          </p>
        ))}
      </YotpoModal>
    </>
  )
}
