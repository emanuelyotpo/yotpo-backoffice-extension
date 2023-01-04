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
import CurrencyAutocomplete from '../currencyAutocomplete/currencyAutocomplete'

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
  let [staticContent, setStaticContent] = useState({})
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  let [platformName, setPlatformName] = useState('')
  let [baseUrl, setBaseUrl] = useState('')
  let [currency, setCurrency] = useState('')
  let [disabled, setDisabled] = useState(false)
  let platformList = [
    'bigcommerce',
    'commerce_cloud',
    'custom',
    'magento',
    'magento2',
    'shopify',
  ]

  function handleChange(key: any, event: any) {
    // let value = event.target.value
    if (!event.target.value) {
      return
    }
    // if (key === 'storeAccountLoginUrl' || key === 'storeLoginUrl') {
    //   setLoginURL(event.target.value)
    // } else if (
    //   key === 'storeAccountRegistrationUrl' ||
    //   key === 'storeRegistrationUrl'
    // ) {
    //   setRegistrationURL(event.target.value)
    // } else if (key === 'platformName') {
    //   setPlatformName(event.target.value)
    // } else if (key === 'baseUrl') {
    //   setBaseUrl(event.target.value)
    // }
    // saveToStaticContent(key, event.target.value)
    staticContent[key] = event.target.value
  }

  let getData = (value: string) => {
    if (value.length === 3) {
      staticContent['currency'] = value
    }
  }

  let saveToStaticContent = (key: string, value: string) => {
    // if (key === 'currency') {
    //   staticContent[key] = value.toUpperCase()
    // } else {
    //   staticContent[key] = value.toLowerCase()
    // }
    // console.log(
    //   'disable? ',
    //   !loginURL.length &&
    //     !registrationURL.length &&
    //     !platformName.length &&
    //     !baseUrl.length &&
    //     !(currency.length === 3)
    // )
    // console.log(!(currency.length === 3))
    // console.log(staticContent)
  }

  let handleSave = () => {
    try {
      editSingleLoyaltyInstanceStaticContent(
        props.instance.guid,
        props.instance.id,
        staticContent
      )
      setToggle(false)
      handleClose()
      toast('success', "Saving, please don't close this dialog")
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
        setCurrency(response.instance.static_content.currency || '')
      })
      .catch((error: any) => toast('danger', error))
  }

  useEffect(() => {
    setLoyaltyInstanceStaticContent()
    getData = getData.bind(this)
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
        // mainActionDisabled={
        //   !loginURL.length &&
        //   !registrationURL.length &&
        //   !platformName.length &&
        //   !baseUrl.length &&
        //   !(currency.length === 3)
        // }
      >
        {Object.keys(staticContent).map((key, i) => (
          <p key={i}>
            <span>{key}:&nbsp;</span>
            {key === 'storeAccountLoginUrl' ||
            key === 'storeAccountRegistrationUrl' ||
            key === 'storeLoginUrl' ||
            key === 'storeRegistrationUrl' ||
            key === 'platformName' ||
            key === 'baseUrl' ||
            key === 'currency' ? (
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
                  <span>
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
                  </span>
                ) : key === 'currency' ? (
                  <span>
                    <CurrencyAutocomplete
                      key={key}
                      value={staticContent[key]}
                      sendData={getData}
                    />
                  </span>
                ) : (
                  <span>
                    <YotpoInput
                      type={YotpoInputType.text}
                      clearable={true}
                      required={true}
                      value={staticContent[key]}
                      placeholder={staticContent[key]}
                      onYotpoChange={(event: Event) => handleChange(key, event)}
                    />
                  </span>
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
