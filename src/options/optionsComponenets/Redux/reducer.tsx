import { OptionsActionType } from './optionsActionTypes'
import { OptionsAppData } from './OptionsAppData'
import { Action } from './action'

export function reduce(
  oldOptionsAppData: OptionsAppData = new OptionsAppData(),
  action: Action
): OptionsAppData {
  const newOptionsAppData = { ...oldOptionsAppData }

  switch (action.type) {
    case OptionsActionType.SetStoredOptions:
      newOptionsAppData.tabs = [...newOptionsAppData.tabs]
      newOptionsAppData.js = [...newOptionsAppData.js]
      newOptionsAppData.accounts = [...newOptionsAppData.accounts]
      newOptionsAppData.options = { ...newOptionsAppData.options }
      newOptionsAppData.tabs = action.payload.tabs
      newOptionsAppData.js = action.payload.js
      newOptionsAppData.options = action.payload
      newOptionsAppData.accounts = action.payload.accounts
      newOptionsAppData.darkMode = action.payload.darkMode
      break

    case OptionsActionType.SetJs:
      newOptionsAppData.js = [...newOptionsAppData.js]
      for (let i = 0; i < newOptionsAppData.js.length; i++) {
        if (newOptionsAppData.js[i].value === action.payload.value) {
          newOptionsAppData.js[i].isDefault = true
        } else {
          newOptionsAppData.js[i].isDefault = false
        }
      }
      newOptionsAppData.options.js = newOptionsAppData.js

      break

    case OptionsActionType.SetTabsOrder:
      if (action.payload.newIndex >= newOptionsAppData.tabs.length) {
        var k = action.payload.newIndex - newOptionsAppData.tabs.length + 1
        while (k--) {
          newOptionsAppData.tabs.push(undefined)
        }
      }
      newOptionsAppData.tabs.splice(
        action.payload.newIndex,
        0,
        newOptionsAppData.tabs.splice(action.payload.oldIndex, 1)[0]
      )
      newOptionsAppData.options.tabs = newOptionsAppData.tabs
      break

    case OptionsActionType.AddAccount:
      newOptionsAppData.accounts = [...newOptionsAppData.accounts]
      newOptionsAppData.options.accounts = [
        ...newOptionsAppData.options.accounts,
      ]
      newOptionsAppData.accounts.push(action.payload)
      newOptionsAppData.options.accounts.push(action.payload)
      break

    case OptionsActionType.RemoveAccount:
      newOptionsAppData.accounts = [...newOptionsAppData.accounts]
      newOptionsAppData.options.accounts = [
        ...newOptionsAppData.options.accounts,
      ]

      for (let i = 0; i < newOptionsAppData.accounts.length; i++) {
        if (
          newOptionsAppData.accounts[i].accountName ===
          action.payload.accountName
        ) {
          newOptionsAppData.accounts.splice(i, 1)
        }
      }
      newOptionsAppData.options.accounts = newOptionsAppData.accounts
      break

      case OptionsActionType.SetDarkMode:
        newOptionsAppData.darkMode = action.payload.value
        newOptionsAppData.options.darkMode = newOptionsAppData.darkMode
        break
  }

  return newOptionsAppData
}
