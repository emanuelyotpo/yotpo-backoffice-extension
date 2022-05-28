import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material'
import React, { Key, useState } from 'react'
import { useSelector } from 'react-redux'
import EditLoginAndRegistrationUrls from '../EditURLsModal/editURLsModal'
import { AppData } from '../Redux/AppData'
import './nestedList.css'

export default function NestedList(props: any) {
  let dataValues = props.data
  let linkRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  let guid = useSelector((state: AppData) => state.guid)

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
            <List component="div" className="nested-list" disablePadding>
              {dataValues.map(
                (
                  data: {
                    key: string
                    value: string
                    id: string
                    type: string
                    parent_instance_id?: number
                  },
                  index: Key | null | undefined
                ) => {
                  if (data.value === 'N/A') {
                    return
                  } else if (linkRegex.exec(data.value)) {
                    return (
                      <ListItem id={data.id} key={index}>
                        {`${data.key}:\u00A0`}
                        <Link target="_blank" href={data.value}>
                          Link
                        </Link>
                      </ListItem>
                    )
                  } else if (data.type === 'loyaltyInstance') {
                    return (
                      <>
                        <Tooltip title={data.key}>
                          <ListItem
                            className="loyalty-instance-list-item"
                            id={data.id}
                            key={index}
                          >
                            {`${data.id}:\u00A0${data.value}`}
                            <Tooltip title="Click To Edit Static Content">
                              <EditLoginAndRegistrationUrls
                                instance={{ id: data.id, name: data.key, guid }}
                              />
                            </Tooltip>
                          </ListItem>
                        </Tooltip>
                      </>
                    )
                  } else if (data.type === 'loyaltyCampaign') {
                    return (
                      <Tooltip title={data.key}>
                        <ListItem id={data.id} key={index}>
                          {`${data.id}:\u00A0`}
                          <ListItemText primary={data.key} />
                        </ListItem>
                      </Tooltip>
                    )
                  } else if (data.type === 'loyaltyRedemption') {
                    return (
                      <Tooltip title={data.key}>
                        <ListItem id={data.id} key={index}>
                          {`${data.id}:\u00A0`}
                          <ListItemText primary={data.value} />
                        </ListItem>
                      </Tooltip>
                    )
                  }
                  else if (data.type === 'loyaltyVipTier') {
                    return (
                      <Tooltip title={data.key}>
                        <ListItem id={data.id} key={index}>
                          {`${data.id}:\u00A0`}
                          <ListItemText primary={data.value} />
                        </ListItem>
                      </Tooltip>
                    )
                  } else {
                    return (
                      <ListItem id={data.id} key={index}>
                        {`${data.key}:\u00A0`}
                        <ListItemText primary={data.value} />
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
