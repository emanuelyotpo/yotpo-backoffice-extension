import { Modal, Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  editSingleLoyaltyInstanceStaticContent,
  fetchSingleLoyaltyInstanceData,
} from '../../utils/api'
import { AppData } from '../Redux/AppData'
import './editURLsModal.css'

export default function editURLsModal(props: any) {
  let guid = useSelector((state: AppData) => state.guid)
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

  const handleSave = () => {
    editSingleLoyaltyInstanceStaticContent(
      props.instance.guid,
      props.instance.id,
      staticContent
    )
      .then((response) => {
        setToggle(false)
        handleClose()
      })
      .catch((error) => console.log(error))
  }

  const setLoyaltyInstanceStaticContent = () => {
    fetchSingleLoyaltyInstanceData(guid, props.instance.id)
      .then((response) => {
        setStaticContent(response.instance.static_content)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    setLoyaltyInstanceStaticContent()
  }, [])

  return (
    <>
      <Button className="edit-static-content-button" onClick={handleOpen}>
        EDIT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Static Content For {props.instance.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {Object.keys(staticContent).map((key, i) => (
              <p key={i}>
                <span>{key} : </span>
                {key === 'storeAccountLoginUrl' ||
                key === 'storeAccountRegistrationUrl' ||
                key === 'storeLoginUrl' ||
                key === 'storeRegistrationUrl' ||
                key === 'baseUrl' ? (
                  <>
                    {toggle ? (
                      <span onDoubleClick={toggleInput}>
                        {staticContent[key]}
                      </span>
                    ) : (
                      <input
                        type="text"
                        defaultValue={staticContent[key]}
                        onChange={() => handleChange(key, event)}
                      />
                    )}
                  </>
                ) : (
                  <span>{staticContent[key]}</span>
                )}
              </p>
            ))}
          </Typography>
          <div className="buttons">
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
