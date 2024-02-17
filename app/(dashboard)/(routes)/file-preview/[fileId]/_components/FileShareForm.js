import { Copy } from 'lucide-react';
import React, { useState } from 'react'
import GlobalApi from '../../../../../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

function FileShareForm({file,onPasswordSave}) {
  const [isPasswordEnabled,setIsPasswordEnabled] = useState(false);
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const {user} = useUser();
  const sendEmail = () =>{
   const data = {
         emailToSend : email,
         fullName : user?.fullName,
         fileName : file.fileName,
         fileSize : file.fileSize,
         fileType : file.fileType,
         shortUrl : file.shortUrl
   };
   GlobalApi.sendEmail(data).then(resp => console.log(resp));
  }
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

        <div className='p-5 border rounded-md flex flex-col gap-2'>
         <label className='text-gray-500 text-[13px]'>Send file to Email</label>
         <input className='border rounded-md p-2' type='text' placeholder='example@gmail.com' />
         <button 
         className='bg-primary p-3 rounded-md text-white font-bold'
         onClick={()=>sendEmail()}
         >Send File</button>
        </div>

    </div>
  )
}

export default FileShareForm
