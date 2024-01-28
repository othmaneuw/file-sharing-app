import { Copy } from 'lucide-react';
import React, { useState } from 'react'

function FileShareForm({file,onPasswordSave}) {
  const [isPasswordEnabled,setIsPasswordEnabled] = useState(false);
  const [password,setPassword] = useState("");
  return file && (
    <div className='flex flex-col gap-2'>
       <div>
        <label className='text-[14px] text-gray-500'>Short URL</label>
        <div className='flex gap-5 p-2 border rounded-md justify-between'>
            <input type='text' value={file.shortUrl} disabled
                   className='disabled:text-gray-500 bg-transparent w-full'
            />
            <Copy className='text-gray-400 hover:text-gray-600' />
        </div>
       </div>
       <div className='gap-3 flex mt-5'>
          <input id="img" type='checkbox' onChange={(e)=>setIsPasswordEnabled(!isPasswordEnabled)} />
          <label for='img'>Enable Password ?</label>
       </div>

        {isPasswordEnabled && <div className='flex gap-3 items-center'>
             <div className=''>
                <input type='password'
                       onChange={(e)=>setPassword(e.target.value)}
                       className='border rounded-md w-full p-2'
                       
                />
             </div>
             <button className='p-2 bg-primary text-white rounded-md
              disabled:bg-gray-300 hover:bg-blue-700'
              disabled={password?.length < 3}
              onClick={()=>onPasswordSave(password)}>Save</button>
        </div>    }

    </div>
  )
}

export default FileShareForm
