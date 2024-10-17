import React from 'react'

const Headers = (props) => {
  return (
    <>
      <div className='flex gap-3 p-2 bg-blue-600 h-full justify-between'>
        <div className='bg-white w-2/4 p-2 rounded-md shadow-md h-full flex justify-around items-center'>
          <div className='flex flex-col gap-2 justify-center items-center'>
            <div className='text-md font-bold text-slate-700'>{props.pending}</div>
            <div className='text-sm text-gray-600 font-bold'>Pending</div>
          </div>
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-break-fill text-blue-600" viewBox="0 0 16 16">
              <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V9H2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM2 12h12v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
            </svg>
          </div>
        </div>
        <div className='bg-white w-2/4 p-2 rounded-md shadow-md h-full flex justify-around items-center'>
          <div className='flex flex-col gap-2 justify-center items-center'>
            <div className='text-md font-bold text-slate-700'>{props.completed}</div>
            <div className='text-sm text-gray-600 font-bold'>Completed</div>
          </div>
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-check-fill text-blue-600" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Headers