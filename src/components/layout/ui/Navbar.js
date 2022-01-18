import React from 'react'
import { FaWindowClose } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../../manager/actions/authActions'

export default function Navbar() {
  const dispatch = useDispatch()
  const {userName} = useSelector(state => state.auth)
  const handleLogout = () => {
    dispatch(startLogout())
  }
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        {userName}
      </span>
      <button 
        className='btn btn-outline-danger' 
        onClick={handleLogout}
      > 
        <span>
          <FaWindowClose />
        </span>
      </button>
      
    </div>
  )
}
