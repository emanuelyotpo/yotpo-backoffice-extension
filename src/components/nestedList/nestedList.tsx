import React, { useState } from 'react'
import './nestedList.css'
import { YotpoCard } from '@yotpo-common/react-b2b-components/card'
import DataTable from '../dataTable/dataTable'
import { YotpoCollapsible } from '@yotpo-common/react-b2b-components/enums'

export default function NestedList(props: { listTitle: any; data: any }) {

  return (
    <div className="collapsible">
      {props.data && (
        <YotpoCard
          cardTitle={props.listTitle}
          collapsible={YotpoCollapsible.icon}
          bodyMargins={false}
          collapsibleOpen={false}
        >
          <DataTable data={props.data} />
        </YotpoCard>
      )}
    </div>
  )
}
