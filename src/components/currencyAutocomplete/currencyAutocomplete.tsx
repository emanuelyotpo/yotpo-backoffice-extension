import React, { Key, useEffect, useRef, useState } from 'react'
import { ICurrency } from '../../models/ICurrency'
import './currencyAutocomplete.css'
import { YotpoInput } from '@yotpo-common/react-b2b-components/input'
import { YotpoList } from '@yotpo-common/react-b2b-components/list'
import { YotpoListItem } from '@yotpo-common/react-b2b-components/list-item'
import { useSelector } from 'react-redux'
import { AppData } from '../redux/AppData'

export default function CurrencyAutocomplete(props: {
  key: string
  value: string
  sendData: any
}) {
  let [display, setDisplay] = useState(false)
  let [options, setOptions] = useState([])
  let [search, setSearch] = useState('')
  let currencies: ICurrency[] = useSelector(
    (state: AppData) => state.currencies
  )

  let onSearch = (event: any) => {
    setSearch(event)
    props.sendData(search)
  }

  let onSelect = (event: any) => {
    if (event) {
      setSearch(event.toUpperCase().trim())
    }
    setDisplay(false)
    props.sendData(search)
  }

  useEffect(() => {
    setOptions(currencies)
    setSearch(props.value)
    // console.log('props ', props.value)
    // console.log('search ',search);
    

  }, [props.value])

  return (
    <>
      <YotpoInput
        clearable
        required
        placeholder={props.value}
        maxlength={3}
        minlength={3}
        onYotpoChange={(event: any) =>
          onSearch(event.target.value.toUpperCase().trim())
        }
        onYotpoInput={(event: any) =>
          onSearch(event.target.value.toUpperCase().trim())
        }
        onYotpoFocus={(event: any) => setDisplay(true)}
        value={search}
      />
      {display && (
        <YotpoList
          className="autoContainer"
          onYotpoSelect={(event: any) => onSelect(event.detail.value)}
          onYotpoChange={(event: any) => onSelect(event.detail.value)}
        >
          {options
            .filter(({ value }) => value.includes(search))
            .map(({ value }, index: Key | null | undefined) => {
              return (
                <YotpoListItem
                  key={index}
                  label={value}
                  value={value}
                  tabIndex={0}
                  onClick={(event: any) => {
                    setSearch(event.target.value)
                    props.sendData(event.target.value)
                  }}
                />
              )
            })}
        </YotpoList>
      )}
    </>
  )
}
