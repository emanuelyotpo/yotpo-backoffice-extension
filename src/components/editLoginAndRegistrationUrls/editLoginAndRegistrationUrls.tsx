import React from 'react'
import './editLoginAndRegistrationUrls.css'

export default function EditLoginAndRegistrationUrls({ value, setValue }) {
    
    const onChange = (event: any) => setValue(event.target.value);

  return (
    <input
    type="text"
    aria-label="Field name"
    value={value}
    onChange={onChange}
  />
  )
}