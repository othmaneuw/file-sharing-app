"use client"
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Uploads",
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/upgrade",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b">
        <Image src={"logo.svg"} width={50} height={50} />
      </div>
      <div className="flex flex-col float-left">
        {menuList.map((item, index) => (
          <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full
                            text-gray-500 ${activeIndex === index ? "bg-blue-50 text-primary" 
                            : null}`}
                  onClick={()=>setActiveIndex(index)}
          >
            {/* <item.icon size={32} color='blue' /> */}
            {item.name === "Files" ? (
              <File />
            ) : item.name === "Uploads" ? (
              <Upload />
            ) : (
              <Shield />
            )}
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
