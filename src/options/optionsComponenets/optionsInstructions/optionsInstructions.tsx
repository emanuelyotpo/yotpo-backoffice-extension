import {
  YotpoFooterAction,
  YotpoModalWidth,
  YotpoPriority,
} from '@yotpo-common/react-b2b-components/enums'
import { YotpoIconButton } from '@yotpo-common/react-b2b-components/icon-button'
import React, { useState } from 'react'
import './optionsInstructions.css'
import { YotpoModal } from '@yotpo-common/react-b2b-components/modal'

export default function OptionsInstructions() {
  const [modalOpen, setModalOpen] = useState(false)
  const handleModalHide = (event) => {
    setModalOpen(false)
  }

  return (
    <>
      <YotpoIconButton
        name="info"
        tooltipText="Instructions"
        priority={YotpoPriority.tertiary}
        onClick={() => setModalOpen(true)}
      ></YotpoIconButton>
      <YotpoModal
        className="instructions-modal"
        modalTitle="How To Use The Extension?"
        footerAction={YotpoFooterAction.none}
        dividerHeader={true}
        width={YotpoModalWidth.large}
        open={modalOpen}
        onYotpoHide={(event: Event) => handleModalHide(event)}
      >
        The extension will provide you with details about the page you're on
        that pertains to Yotpo's products.
        <ul>
          <li>
            Make sure you are connected to the VPN for access to some features
          </li>
          <li>Links to Backoffice - For all product lines</li>
          <li>You can inspect the Yotpo elements in a clean JS environment</li>
        </ul>
        <h3>Options page</h3>
        <ul>
          <li>Choose the order of tabs - Drag & Drop</li>
          <li>
            Choose your favorite clean environment (js.do, JS bin, and JS
            Fiddle)
          </li>
          <li style={{ fontWeight: 'bold' }}>
            Make sure to save your changes!
          </li>
        </ul>
        <h3>Reviews</h3>
        <ul>
          <li>
            Product details, grouped & syndicated reviews aggregation, custom
            fields aggregations (only for aggregating fields).
          </li>
          <li>Support for old and new widget versions.</li>
        </ul>
        <h3>Loylaty</h3>
        <ul>
          <li>
            Merchant ID, platform, modules (active and inactive), redemption
            options, earning campaigns, VIP tiers.
          </li>
          <li>
            If a module is marked in green, it means it is installed on the page
            you are on
          </li>
          <li>
            You can view the static content of all the modules, you can edit a
            single module's login/registration/base URLs (if applicable).
          </li>

          <li>
            Edit all the login and registration URLs for all the modules from
            one place.
          </li>
          <li>Data import/pull calculator.</li>
        </ul>
        <h3>VMS</h3>
        <ul>
          <li>Product ID, galleries IDs, photos per product album.</li>
          <li>Retrieves any gallery installed on the page.</li>
        </ul>
        <h3>SMSbump</h3>
        <ul>
          <li>Retrieves the form ID and user ID.</li>
          <li>Retrieves the myshopify</li>
          <li>
            Currently, the extension can only recognize 1 form that's installed.
          </li>
        </ul>
      </YotpoModal>
    </>
  )
}
