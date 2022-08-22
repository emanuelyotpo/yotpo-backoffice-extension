import { ActionType } from './ActionTypes'
import { AppData } from './AppData'
import { Action } from './action'

export function reduce(
  oldOptionsAppData: AppData = new AppData(),
  action: Action
): AppData {
  const newOptionsAppData = { ...oldOptionsAppData }

  switch (action.type) {
    case ActionType.SetStoredOptions:
      newOptionsAppData.tabs = [...newOptionsAppData.tabs]
      newOptionsAppData.js = [...newOptionsAppData.js]
      newOptionsAppData.accounts = [...newOptionsAppData.accounts]
      newOptionsAppData.options = { ...newOptionsAppData.options }
      newOptionsAppData.tabs = action.payload.tabs
      newOptionsAppData.js = action.payload.js
      newOptionsAppData.options = action.payload
      newOptionsAppData.accounts = action.payload.accounts
      break

    case ActionType.SetJs:
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

    case ActionType.SetTabsOrder:
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

    case ActionType.AddAccount:
      newOptionsAppData.accounts = [...newOptionsAppData.accounts]
      newOptionsAppData.options.accounts = [
        ...newOptionsAppData.options.accounts,
      ]
      newOptionsAppData.accounts.push(action.payload)
      newOptionsAppData.options.accounts.push(action.payload)
      break

    case ActionType.RemoveAccount:
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
  }

  return newOptionsAppData
}
