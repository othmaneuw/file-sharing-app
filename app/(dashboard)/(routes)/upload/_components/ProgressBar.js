import React from 'react'

function ProgressBar({progress=40}) {
  return (
    <div className='bg-gray-400 w-full h-6 mt-3 rounded-full '>
         <div className='p-1 bg-primary rounded-full h-6 text-[15px] text-white font-bold'
              style={{width:`${progress}%`}}
         >
              {`${Number(progress.toFixed(0))}%`}
         </div>
    </div>
  )
}

export default ProgressBar
