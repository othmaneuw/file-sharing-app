import { AlertCircle } from 'lucide-react'
import React from 'react'

function AlertMsg({msg}) {
  return (
    <div className='bg-red-500 p-4 mt-5 text-white rounded-md flex gap-5 items-center font-bold'>
       <AlertCircle />
       {msg}
    </div>
  )
}

export default AlertMsg
