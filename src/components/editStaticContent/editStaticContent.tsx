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
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import { YotpoIcon } from '@yotpo-common/react-b2b-components/icon'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import { toast } from '../../utils/generalFunctions'
import { YotpoDropdown } from '@yotpo-common/react-b2b-components/dropdown'
import { YotpoList } from '@yotpo-common/react-b2b-components/list'
import { YotpoListItem } from '@yotpo-common/react-b2b-components/list-item'

export default function EditStaticContent(props: any) {
  let guid = useSelector((state: AppData) => state.guid)
  let darkMode: boolean = useSelector((state: AppData) => state.darkMode)
  let [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  let handleClose = () => {
    setModalOpen(false)
    setToggle(false)
  }
  let [toggle, setToggle] = useState(false)
  let toggleInput = () => {
    setToggle(false)
  }
  let [staticContent, setStaticContent] = useState({})
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  let [platformName, setPlatformName] = useState('')
  let [baseUrl, setBaseUrl] = useState('')
  let platformList = [
    'bigcommerce',
    'commerce_cloud',
    'custom',
    'magento',
    'magento2',
    'shopify',
  ]

  function handleChange(key: any, event: any) {
    if (!event.target.value) {
      return
    }
    if (key === 'storeAccountLoginUrl' || key === 'storeLoginUrl') {
      setLoginURL(event.target.value)
    } else if (
      key === 'storeAccountRegistrationUrl' ||
      key === 'storeRegistrationUrl'
    ) {
      setRegistrationURL(event.target.value)
    } else if (key === 'platformName') {
      setPlatformName(event.target.value)
    } else if (key === 'baseUrl') {
      setBaseUrl(event.target.value)
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
        toast('success', 'Saved')
      })
    } catch (error) {
      toast('danger', error)
    }
  }

  const setLoyaltyInstanceStaticContent = () => {
    fetchSingleLoyaltyInstanceData(guid, props.instance.id)
      .then((response) => {
        setStaticContent(response.instance.static_content)
        setLoginURL(
          response.instance.static_content.storeAccountLoginUrl ||
            response.instance.static_content.storeLoginUrl ||
            ''
        )
        setRegistrationURL(
          response.instance.static_content.storeAccountRegistrationUrl ||
            response.instance.static_content.storeRegistrationUrl ||
            ''
        )
        setPlatformName(response.instance.static_content.platformName || '')
        setBaseUrl(response.instance.static_content.baseUrl || '')
      })
      .catch((error: any) => toast('danger', error))
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
        // className={darkMode ? 'yotpo-theme-dark-bg' : ''}
        open={modalOpen}
        modalTitle={`Static Content for ${props.instance.id}`}
        onYotpoHide={handleClose}
        onYotpoMainAction={handleSave}
        onYotpoSecondaryAction={handleClose}
        mainActionDisabled={
          !loginURL.length &&
          !registrationURL.length &&
          !platformName.length &&
          !baseUrl.length
        }
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
                {!toggle ? (
                  <>
                    <span>{staticContent[key]}</span>
                    <YotpoTooltip
                      text="Edit"
                      tooltipPlacement={YotpoDirection.top}
                    >
                      <YotpoIcon
                        name="edit"
                        onClick={() => setToggle(true)}
                      ></YotpoIcon>
                    </YotpoTooltip>
                  </>
                ) : key === 'platformName' ? (
                  <YotpoDropdown
                    clearable
                    required
                    placeholder={platformName}
                    value={staticContent[key]}
                    onYotpoSelect={(event: Event) => handleChange(key, event)}
                    onYotpoChange={(event: Event) => handleChange(key, event)}
                  >
                    <YotpoIcon name="chevron-down-big" slot="suffix" />
                    <YotpoList>
                      {platformList.map((name, i) => (
                        <YotpoListItem
                          label={name}
                          value={name}
                        ></YotpoListItem>
                      ))}
                    </YotpoList>
                  </YotpoDropdown>
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
