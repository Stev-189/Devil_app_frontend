import React from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { useDispatch } from 'react-redux'

import { eventDeleted } from '../../../manager/actions/eventsActions'

export const DeleteEventFab = () => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    //recordar que al abrir un nuevo evento, elimine el evento activo
    dispatch(eventDeleted())
  }
  return (
    <button
      className='btn fab btn-primary fab-delete'
      onClick={handleDelete}
    >
      <FaTrashAlt />
    </button>
  )
}
