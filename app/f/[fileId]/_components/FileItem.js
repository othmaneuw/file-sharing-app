import axios from "axios";
import { Download } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function FileItem({ file, fileId }) {
  const [password, setPassword] = useState("");
  console.log("hello kekekek", fileId);
  // const downloadClick = async (uuid) =>{
  //       const response = await axios.get(`http://localhost:4000/api/files/download/${uuid}`);
  //       console.log(response);
  // }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/files/decrypt/${fileId}`)
      .then((res) => console.log("perfecto"));
  }, []);
  return (
    file && (
      <div>
        <div className="p-5 rounded-md bg-white flex flex-col items-center">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-primary">New File</strong>
              <h2 className="text-[10px] text-gray-400">Find details</h2>
              <h2 className="text-gray-500 text-[15px]">
                {" "}
                {file.fileName} | {file.fileType} | {file.fileSize} Bytes
              </h2>
            </h2>
          </div>
          {file.password.length > 3 ? (
            <input
              type="password"
              className="p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to access"
            />
          ) : null}
          <div>
            <Link href={`http://localhost:4000/api/files/download/${fileId}`}>
              <button
                className="flex gap-2 p-2 bg-primary text-white
         rounded-full w-full items-center hover:bg-blue-800 text-[14px]
         mt-5 text-center justify-center disabled:bg-gray-300"
                onClick={() =>
                  window.location.assign(
                    `http://localhost:4000/api/files/download/${fileId}`
                  )
                }
                disabled={file.password !== password}
              >
                <Download className="h-4 w-4" /> Download encrypted
              </button>
            </Link>
            <Link href={`http://localhost:4000/api/files/download/normal/${fileId}`}>
              <button
                className="flex gap-2 p-2 bg-green-500 text-white
         rounded-full w-full items-center hover:bg-green-700 text-[14px]
         mt-5 text-center justify-center disabled:bg-gray-300"
                onClick={() =>
                  window.location.assign(
                    `http://localhost:4000/api/files/download/normal/${fileId}`
                  )
                }
                disabled={file.password !== password}
              >
                <Download className="h-4 w-4" /> Download normal
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default FileItem;
