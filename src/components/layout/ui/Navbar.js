import React from 'react'
import { FaWindowClose } from "react-icons/fa"

export default function Navbar() {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>
        Devil
      </span>
      <button className='btn btn-outline-danger' > 
        <span>
          <FaWindowClose />
        </span>
      </button>
      
    </div>
  )
}
