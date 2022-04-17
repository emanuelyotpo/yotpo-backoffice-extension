import { Link, List, ListItem, ListItemText } from '@mui/material'
import React, { Key, useState } from 'react'
import './dataList.css'

export default function DataList(props: any) {
  let dataValues = props.data
  let linkRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/


  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {dataValues.map(
          (
            data: {
              key: string
              value: string
              id: string
            },
            index: Key | null | undefined
          ) => {
            if (linkRegex.exec(data.value))
              return (
                <ListItem id={data.id} key={index}>
                  {data.key}{' '}
                  <Link target="_blank" href={data.value}>
                    Link
                  </Link>
                </ListItem>
              )
            return (
              <ListItem id={data.id} key={index}>
                {data.key} <ListItemText primary={data.value} />
              </ListItem>
            )
          }
        )}
      </List>
    </>
  )
}
