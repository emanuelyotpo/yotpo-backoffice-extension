export interface LocalStorage {
  userFavoriteTab?: string[]
  options?: LocalStorageOptions
}

export interface LocalStorageOptions {
  userFavoriteTab: string
  options: string
}

export type LocalStorageKeys = keyof LocalStorage

export function setFavoriteTab(userFavoriteTab: string[]): Promise<void> {
  const vals: LocalStorage = {
    userFavoriteTab,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getFavoriteTab(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['userFavoriteTab']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.userFavoriteTab ?? [])
    })
  })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}
