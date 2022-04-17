import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { Key, useState } from 'react'
import EditLoginAndRegistrationUrls from '../editLoginAndRegistrationUrls/editLoginAndRegistrationUrls'
import './nestedList.css'

export default function NestedList(props: any) {
  let dataValues = props.data
  let linkRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const [value, setValue] = useState()

  return (
    <>
      {dataValues && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItem>{props.listTitle}: </ListItem>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ padding: '16px' }}
          >
            <List component="div" disablePadding>
              {dataValues.map(
                (
                  data: {
                    key: string
                    value: string
                    id: string
                  },
                  index: Key | null | undefined
                ) => {
                  if (data.value === 'N/A') {
                    return
                  }
                  if (linkRegex.exec(data.value)) {
                    return (
                      <ListItem id={data.id} key={index}>
                        {data.key}{' '}
                        <Link target="_blank" href={data.value}>
                          Link
                        </Link>
                      </ListItem>
                    )
                  }
                  if (
                    data.id === 'moduleId' ||
                    data.id === 'loginURL' ||
                    data.id === 'registerURL'
                  ) {
                    <ListItem id={data.id} key={index}>
                      {data.key}{' '}
                      <EditLoginAndRegistrationUrls
                        value={data.value}
                        setValue={setValue}
                      />
                    </ListItem>
                  } else {
                    return (
                      <ListItem id={data.id} key={index}>
                        {data.key} <ListItemText primary={data.value} />
                      </ListItem>
                    )
                  }
                }
              )}
            </List>
          </Collapse>
        </>
      )}
      {!dataValues && (
        <ListItem>
          More Details: <ListItemText primary="Not Available" />
        </ListItem>
      )}
    </>
  )
}
