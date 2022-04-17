import { Button, Tooltip } from '@mui/material'
import React, { Key } from 'react'
import './buttons.css'

export default function Buttons(props: any) {
  let buttons = props.buttons

  return (
    <div className="buttons">
      {buttons.map(
        (
          button: {
            description: string
            func?: any
            href?: string
            target?: string
            toolTip?: string
          },
          index: Key | null | undefined
        ) => (
          <>
            <Tooltip title={button.toolTip}>
              <Button
                key={index}
                variant="outlined"
                className="btn"
                onClick={button.func}
                href={button.href}
                target={button.target}
              >
                {button.description}
              </Button>
            </Tooltip>
          </>
        )
      )}
    </div>
  )
}