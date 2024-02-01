"use client";
import { app } from "../../../../../firebaseConfig";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";
import SavePasswordCompleted from "./_components/SavePasswordCompleted";

function FilePreview({ params }) {
  const db = getFirestore(app);
  const [show,setShow] = useState(false);
  const [file, setFile] = useState();
  useEffect(() => {
    console.log("Othmaaane", params?.fileId);
    params?.fileId && getFileInfo();
  }, []);
  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // SAVE PASSWORD TO THE FILE
  const onPasswordSave = async (password) =>{
      const docRef = doc(db,"uploadedFile",params?.fileId);
      await updateDoc(docRef,{
        password
      }) 
      setShow(true);
  }

  return (
    <div className="py-10 px-10">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare /> Go back to upload page
      </Link>
      {file !== undefined && (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <FileInfo file={file} />
          <FileShareForm file={file} onPasswordSave={(password)=>onPasswordSave(password)}/>
        </div>
      )}
      {show && <SavePasswordCompleted setShow={setShow} />}
    </div>
  );
}

export default FilePreview;
