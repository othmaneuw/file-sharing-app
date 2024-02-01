"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "../../../_utils/GenerateRandomString";
import { useRouter } from "next/navigation";
import { app } from "../../../../firebaseConfig";

function Upload() {
  // ROUTER
  const router = useRouter();
  // GET THE AUTHENTICATED USER
  const {user} = useUser();
  const [progress,setProgress] = useState();
  // INIT FIREBASE STORAGE
  const storage = getStorage(app);
  // INIT FIRESTORE
  const db = getFirestore(app);
  //UPLOAD FILE
  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress);
      // Upload completed successfully, now we can get the download URL
      progress == 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);  
        saveInfo(file,downloadURL);
      });
    });
  };

  // ADD DATA TO FIRESTORE
  const saveInfo = async (file,fileUrl) =>{
    const docId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName : file?.name,
      fileSize : file?.size,
      fileType : file?.type,
      fileUrl,
      userEmail : user?.primaryEmailAddress.emailAddress,
      userName : user?.fullName,
      password : "",
      id : docId,
      shortUrl : process.env.NEXT_PUBLIC_BASE_URL+docId
    });
    router.push("/file-preview/"+docId);
  }

  return (
    <div className="p-5 px-8">
      <h2 className="text-[20px] m-5 text-center">
        Start <strong className="text-primary">Uploading</strong> file and{" "}
        <strong className="text-primary">share</strong> it
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
    </div>
  );
}

export default Upload;
