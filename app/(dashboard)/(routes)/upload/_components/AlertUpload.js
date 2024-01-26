import React from "react";

function AlertUpload() {
  return (
    <div className="bg-green-500 w-[30%] rounded-full absolute top-0 right-0">
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-green-500 p-4"
      >
        <div className="flex items-start gap-4">
          <span className="text-white font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <div className="flex-1">
            <strong className="block text-white font-bold">
              File uploaded successfully
            </strong>

            
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default AlertUpload;
