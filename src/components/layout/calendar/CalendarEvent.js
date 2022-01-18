import React from 'react'

export const CalendarEvent = ({event}) => {
  const {title, userName} = event
  return (
    <div>
      <strong>{ title }</strong>
      <span> - { userName }</span>
    </div>
  )
}
