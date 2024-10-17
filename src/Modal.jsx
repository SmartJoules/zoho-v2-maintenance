import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';

const Modal = ({ status,handleClose, children }) => {
  return (
    <div aria-hidden='true' data-modal-backdrop="static" className={`${status ? "" : "hidden"} flex fixed overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-65`}>
      <div className='relative w-full max-w-2xl max-h-full p-4'>
        <div className='relative bg-white rounded-lg shadow'>
          <div className='text-end p-2 border-b'><Icon name='close' className='cursor-pointer text-red-500' onClick={() => handleClose()} /></div>
          <div className='p-2'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal