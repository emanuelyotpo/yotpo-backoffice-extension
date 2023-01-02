import React from 'react'
import './notLoggedIn.css'

export default function NotLoggedIn() {
  return (
    <div className="not-logged-in">
      <img src="logo.png" />
      <h1 className="yotpo-text-large yotpo-text-primary">
        This extension is for Yotpo employees only.
      </h1>
      <h2 className="yotpo-text-medium yotpo-text-secondary">
        If you are not logged in to Chrome with your Yotpo email address, please
        make sure to do that and try again.
      </h2>
    </div>
  )
}
