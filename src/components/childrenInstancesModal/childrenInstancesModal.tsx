import React, { useState } from 'react'
import './childrenInstancesModal.css'
import { YotpoButton } from '@yotpo-common/react-b2b-components/button'
import {
  YotpoColor,
  YotpoDirection,
  YotpoFooterAction,
  YotpoPriority,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'
import { YotpoTooltip } from '@yotpo-common/react-b2b-components/tooltip'
import DataTable from '../dataTable/dataTable'

export default function ChildrenInstancesModal(props: any) {
  const [modalOpen, setModalOpen] = useState(false)
  let handleOpen = () => setModalOpen(true)
  const handleModalHide = (event: any) => {
    setModalOpen(false)
  }

  return (
    <>
      {props.children.length > 0 ? (
        <>
          <YotpoButton priority={YotpoPriority.primary} onClick={handleOpen}>
            View Children
          </YotpoButton>
          <YotpoModal
            open={modalOpen}
            modalTitle={`Children Modals For - ${props.id}`}
            onYotpoHide={(event) => handleModalHide(event)}
            footerAction={YotpoFooterAction.none}
          >
            <DataTable data={props.children}></DataTable>
          </YotpoModal>
        </>
      ) : (
        ''
      )}
    </>
  )
}
