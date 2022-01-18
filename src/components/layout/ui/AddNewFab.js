import React from 'react'
import { FaCalendarPlus } from "react-icons/fa"
import { useDispatch } from 'react-redux'

import { uiOpenModal } from '../../../manager/actions/uiActions'

export const AddNewFab = () => {
  const dispatch = useDispatch()
  const handleClickNew = () => {
    //recordar que al abrir un nuevo evento, elimine el evento activo
    dispatch(uiOpenModal())
  }
  return (
    <button
      className='btn fab btn-primary'
      onClick={handleClickNew}
    >
      <FaCalendarPlus />
    </button>
  )
}

