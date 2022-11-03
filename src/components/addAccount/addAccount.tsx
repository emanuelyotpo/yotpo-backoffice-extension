import React, { useRef, useState } from 'react'
import './addAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from '../redux/actionTypes'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import { setStoredOptions } from '../../utils/storage'
import { AppData } from '../redux/AppData'
import { YotpoDropdown } from '@yotpo-common/react-b2b-components/dropdown'
import { YotpoList } from '@yotpo-common/react-b2b-components/list'
import { YotpoListItem } from '@yotpo-common/react-b2b-components/list-item'
import { toastAlert } from '@yotpo-common/react-b2b-components/alert'
import { YotpoStatus } from '@yotpo-common/react-b2b-components/enums'

export default function AddAccount() {
  const dispatch = useDispatch()
  let [accountName, setAccountName] = useState('')
  let [key, setOrgKey] = useState('')
  let [type, setType] = useState('')
  let options = useSelector((state: AppData) => state.options)
  const accountNameRef = useRef(null)
  const keyRef = useRef(null)
  const typeRef = useRef(null)

  const handleAccountNameChange = (event: any) => {
    setAccountName(event.detail)
  }
  const handleOrgKeyChange = (event: any) => {
    setOrgKey(event.detail)
  }
  const handleTypeChange = (event: any) => {
    setType(event.target.value)
  }

  const handleAddAccount = () => {
    if (!accountName || !key || !type) {
      return
    }
    dispatch({
      type: ActionType.AddAccountToList,
      payload: { accountName: accountName, key: key, type: type },
    })
    setStoredOptions(options).then(() => {
      toastAlert(
        {
          alertTitle: 'Saved',
          status: YotpoStatus.success,
          icon: true,
        },
        () => {}
      )
      accountNameRef.current.value = ''
      keyRef.current.value = ''
      typeRef.current.value = ''
      setAccountName('')
      setOrgKey('')
      setType('')
    })
  }

  return (
    <>
      <div className="add-account">
        <form>
          <YotpoInput
            helpText="Account Name"
            name="accountName"
            ref={accountNameRef}
            onYotpoChange={(e: Event) => handleAccountNameChange(e)}
            clearable={true}
            value={accountName}
            required={true}
          ></YotpoInput>
          <YotpoInput
            helpText="Search Key"
            name="key"
            ref={keyRef}
            onYotpoChange={(e: Event) => handleOrgKeyChange(e)}
            clearable={true}
            value={key}
            required={true}
          ></YotpoInput>
          <YotpoDropdown
            clearable
            helpText="Search Key Type"
            onYotpoSelect={(e: Event) => handleTypeChange(e)}
            ref={typeRef}
            required={true}
          >
            <YotpoList>
              <YotpoListItem label="Org Key" value="orgKey"></YotpoListItem>
              <YotpoListItem label="App Key" value="appKey"></YotpoListItem>
              <YotpoListItem label="Domain" value="domain"></YotpoListItem>
              <YotpoListItem label="Email" value="email"></YotpoListItem>
            </YotpoList>
          </YotpoDropdown>
          <YotpoButton onClick={() => handleAddAccount()}>Add</YotpoButton>
        </form>
      </div>
    </>
  )
}
