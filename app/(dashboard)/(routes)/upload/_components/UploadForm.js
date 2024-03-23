import React, { useState } from "react";
import AlertMsg from "./AlertMsg";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import AlertUpload from "./AlertUpload";
import axios from "axios";

function UploadForm({uploadBtnClick,progress}) {
  const [file,setFile] = useState(null);
  const [errorMsg,setErrorMsg] = useState(null);
  const onFileSelect = async (file) =>{
        console.log(file);
        if(file && file.size > 2000000){
          console.log("File Greater than 2 MB");
          setErrorMsg("File size greater than 2 MB");
          return;
        }
        setFile(file);
        setErrorMsg(null);
        //
        // const formData = new FormData();
        // formData.append('file',file);
        // const response = await axios.post("http://localhost:4000/api/files",formData);
        // console.log(response);

  }
  return (
    <div className="text-center">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 "
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-12 h-12 mb-4 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-gray-400 font-bold text-lg">
              Click to <strong className="text-primary">upload</strong> or <strong className="text-primary">drag</strong> and <strong className="text-primary">drop</strong>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 2MB)
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden"
                 onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>
      {errorMsg && <AlertMsg msg={errorMsg} />}
      {file && <FilePreview file={file} removeFile={()=>setFile(null)} />}
      
       {progress ? <ProgressBar progress={progress} /> : <button disabled={!file} className="p-2 bg-primary text-white font-bold w-[30%]
       rounded-full mt-5 disabled:bg-gray-400" onClick={()=>uploadBtnClick(file)}>
        Upload
       </button>}
       {/* {progress === 100 && <AlertUpload />}  */}
    </div>
  );
}

export default UploadForm;
