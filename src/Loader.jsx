import React from 'react'
import {Skeleton} from 'antd'
const Loader = () => {
  return (
    <div className='flex flex-col gap-[30px] p-2'>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
    </div>
  )
}

export default Loader
