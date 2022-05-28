import { Modal, Box, Typography, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { editAllLoyaltyInstanceStaticContent } from '../../utils/loyaltyFunctions'
import { AppData } from '../Redux/AppData'
import './UpdateAllURLsModal.css'

export default function UpdateAllURLsModal(props?: any) {
  let guid = useSelector((state: AppData) => state.guid)
  let [loginURL, setLoginURL] = useState('')
  let [registrationURL, setRegistrationURL] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = (event?: object, reason?: string) => {
    if (!reason) {
      setOpen(false)
    }
  }

  const [toggle, setToggle] = useState(true)

  function toggleInput() {
    setToggle(false)
  }

  function handleChange(key: any, event: any) {
    if (!event.target.value) {
      return
    }
    staticContent[key] = event.target.value
  }

  let [staticContent, setStaticContent] = useState({})

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  function handleLoginURLChange(event: any) {
    if (!event.target.value) {
      return
    }
    setLoginURL(event.target.value)
  }
  function handleRegistrationURLChange(event: any) {
    if (!event.target.value) {
      return
    }
    setRegistrationURL(event.target.value)
  }

  const handleSave = () => {
    editAllLoyaltyInstanceStaticContent(guid, loginURL, registrationURL)
    setToggle(false)
    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" className="btn action">
        Edit All URLs
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="all-urls-modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Login & Registration URLs
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>
              Login URL:
              <TextField
                id="standard-basic"
                required
                onChange={handleLoginURLChange}
                variant="standard"
              />
            </span>
            <span>
              Registration URL:
              <TextField
                id="standard-basic"
                required
                onChange={handleRegistrationURLChange}
                variant="standard"
              />
            </span>
          </Typography>
          <div className="modal-buttons">
            <Button onClick={handleClose} variant="outlined" className="btn">
              CANCEL
            </Button>
            <Button onClick={handleSave} variant="outlined" className="btn">
              SAVE
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
