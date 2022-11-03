import { IAccount } from "../models/IAccount"
import { IJS } from "../models/IJs"
import { ITabData } from "../models/ITabData"

export interface SyncStorage {
  options: SyncStorageOptions
}

export interface SyncStorageOptions {
  tabs: ITabData[]
  js: IJS[]
  accounts: IAccount[]
}

export type SyncStorageKeys = keyof SyncStorage

export function setStoredOptions(options: SyncStorageOptions): Promise<void> {
  const vals: SyncStorage = {
    options,
  }
  
  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<SyncStorageOptions> {
  const keys: SyncStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: SyncStorage) => {      
      resolve(res.options)
    })
  })
}

export function moveArrayItemToNewIndex(
  array: any[],
  old_index: number,
  new_index: number
) {
  if (new_index >= array.length) {
    var k = new_index - array.length + 1
    while (k--) {
      array.push(undefined)
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0])

  return array
}

export function setDefaultJs(array: IJS[], value: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      array[i].isDefault = true
    } else {
      array[i].isDefault = false
    }
  }
  
  return array
}
